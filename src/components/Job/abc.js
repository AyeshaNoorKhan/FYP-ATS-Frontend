import React, { useEffect, useState } from 'react';
import ImagePicker from 'react-image-picker';
import 'react-image-picker/dist/index.css';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromHTML, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
  Grid,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  ThemeProvider,
  createMuiTheme,
  Dialog,
} from '@material-ui/core';
import { getImages, getProduct } from '../../Database/GetMethods';
import { postNewProduct } from '../../Database/PostMethods';
import './AddProducts.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0275d8',
    },
    secondary: {
      main: '#5bc0de',
    },
  },
});
const Product = (props) => {
  const [attributesList, setAttributesList] = useState([]);
  const [attributesDetailsList, setAttributesDetailsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [productUsp, setProductUsp] = useState(null);
  const [attribute, setAttribute] = useState([]);
  const [productBuyReturn, setProductBuyReturn] = useState('');
  const [detail, setDetail] = useState('');
  const [uiCount, setUiCount] = useState([]);
  const [counter, setCounter] = useState(0);
  const [isRemoved, setIsRemoved] = useState(false);
  const [inComingImages, setIncomingImages] = useState([]);
  const [deactivated, setDeactivated] = useState(false);
  // productAttribute
  const [imageDetail, setImageDetail] = useState([]);
  // id of the Attribute for image
  let [idOfAtt, setIdOfAtt] = useState('');
  const [finalImage, setFinalImage] = useState([]);
  // open the dialog
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [product, setProduct] = useState(null);
  const [incomingDescription, setIncomingDescription] = useState('');
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(incomingDescription))
    )
  );
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProduct(props.match.params.id), getImages()])
      // getProduct(props.match.params.id)
      .then((values) => {
        console.log(values);
        console.log(values[0].info[0].description);
        setProduct(values[0]);
        setProductName(values[0].info[0].product_name);
        setProductUsp(values[0].info[0].usp);
        setIncomingImages(values[1]);
        setIncomingDescription(values[0].info[0].description);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  //multiple image selection
  const onPick = (images) => {
    const img = [...image];
    img.push(images);
    console.log(id);
    console.log(images);
    document.getElementById(id).src = images.src;
    setId('');
    setImage(img);
    setOpen(false);
    console.log(document.getElementById(id).src);
  };
  // handle final image
  const handleFinalImage = () => {
    const FI = [...finalImage];
    FI.push(image);
    setFinalImage(FI);
    console.log(finalImage);
    alert('Images Added');
  };

  // Usp of the product is being handled here
  const handleProductUsp = (e) => {
    if (e.target.value.length <= 255 && (e.target.value !== null || e.target.value !== '')) {
      setProductUsp(e.target.value);
    }
  };

  // product description editor
  const handleDescription = (editorState) => {
    // if (e.blocks[0].text !== null && e.blocks[0].text !== '' ) {
    console.log(editorState);
    setEditorState(editorState);
    handleDescription(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    // }
  };
  // product buy return policy
  const handleBuyReturn = (e) => {
    if (e.blocks[0].text !== null && e.blocks[0].text !== '') {
      setProductBuyReturn(e.blocks[0].text);
    }
  };
  // Detail
  const handleDetail = (e) => {
    if (e.blocks[0].text !== null && e.blocks[0].text !== '') {
      setDetail(e.blocks[0].text);
    }
  };
  // product Name handler
  const handleProductName = (e) => {
    if (e.target.value.length <= 255 && (e.target.value !== null || e.target.value !== '')) {
      setProductName(e.target.value);
    }
  };
  // handle Isremoved
  const handleIsRemoved = () => {
    setIsRemoved(true);
  };
  const handleDeactivated = () => {
    setDeactivated(true);
  };
  // Categories like terry towel etc
  const handleCategories = (e) => {
    setCategory(e.target.value);
  };

  // collection is being handled here
  const handleCollections = (e) => {
    setCollection(e.target.value);
  };
  // onclick re render the same ui

  const handleCheckbox = (e, attName, attId) => {
    if (e.target.checked == true) {
      let A = [...attribute];
      A.push({
        id: attId,
        name: attName,
      });
      setAttribute(A);
    } else {
      for (var i = 0; i < attribute.length; i++) {
        if (attribute[i].name == attName) {
          attribute.splice(i, 1);
        }
      }
      setUiCount([]);
    }
  };

  // data will be submitted using this method
  const SubmitData = () => {
    var temp = [];
    for (let i = 0; i < product.variations.length; i++) {
      let sku = document.getElementById(`sku${product.variations[i].product_variation_id}`).value;
      let quantity = parseInt(
        document.getElementById(`quantity${product.variations[i].product_variation_id}`).value
      );
      let costprice = document.getElementById(
        `costprice${product.variations[i].product_variation_id}`
      ).value;
      let saleprice = document.getElementById(
        `saleprice${product.variations[i].product_variation_id}`
      ).value;
      let discount = parseInt(
        document.getElementById(`discount${product.variations[i].product_variation_id}`).value
      );
      let weight = document.getElementById(
        `weight${product.variations[i].product_variation_id}`
      ).value;
      let soldout = product.variations[i].isSoldOut;
      let comingsoon = product.variations[i].isComingSoon;

      let tempComb = [];
      for (let j = 0; j < attribute.length; j++) {
        let attributeValue = document.getElementById(`attribute${i}${attribute[j].id}`);
        tempComb.push(Number(attributeValue.value));
      }

      let imgList = [];
      for (let l = 0; l < finalImage[i].length; l++) {
        imgList.push(finalImage[i][l]);
      }
      console.log(imgList);
      var obj = {
        sku,
        combination_string: tempComb,
        quantity,
        cost_price: costprice,
        sale_price: saleprice,
        discount,
        weight,
        isSoldOut: soldout,
        isComingSoon: comingsoon,
        primaryImage: imgList[0] || null,
        secondaryImage: imgList[1] || null,
        image_one: imgList[2] || null,
        image_two: imgList[3] || null,
        image_three: imgList[4] || null,
      };
      temp.push(obj);
    }
    console.log(temp);
    const finalObj = {
      ProductInfo: {
        product_name: productName,
        description,
        details: detail,
        shipping_details: productBuyReturn,
        usp: productUsp,
        is_removed: isRemoved,
        keywords: '',
        is_deactivated: deactivated,
      },
      ProductVariations: temp,
      ProductAttributes: finalImage,
      ProductCategory: category,
      ProductCollections: collection,
    };
    console.log(finalObj);
    if (
      productName == '' ||
      productUsp == '' ||
      description == '' ||
      productBuyReturn == '' ||
      detail == '' ||
      category == null ||
      collection.length == 0 ||
      temp.length == 0 ||
      finalImage.length == 0
    ) {
      alert('please Enter the required field');
    } else {
      postNewProduct(finalObj)
        .then((res) => {
          if (res.code == 1) {
            alert('Product uploaded');
          } else {
            alert(res.message);
          }
        })
        .catch((err) => {
          alert(err);
        });
      console.log(finalObj);
    }
  };
  const handleImage = (e, id) => {
    console.log(id);
    setId(id);
    setOpen(true);
  };
  return (
    <>
      {loading ? (
        <div className="container">
          <p className="text-center">Loading...</p>
        </div>
      ) : (
        <ThemeProvider theme={theme}>
          <Paper style={{ padding: '30px' }}>
            <Grid container justify="center">
              <Grid item md={12}>
                <label htmlFor="productname">Product Name</label>
                <TextField
                  required
                  value={product ? product.info[0].product_name : null}
                  onChange={handleProductName}
                  variant="outlined"
                  id="productname"
                  helperText="Product name in any language"
                  type="text"
                  fullWidth
                />
                <label htmlFor="usp">product USP</label>
                <TextField
                  required
                  value={product ? product.info[0].usp : null}
                  onChange={handleProductUsp}
                  variant="outlined"
                  id="usp"
                  helperText="One line usp"
                  type="text"
                  fullWidth
                />

                <label htmlFor="productdescription">Product Description</label>
                <Editor
                  editorState={editorState}
                  onEditorStateChange={handleDescription}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                />
                <label htmlFor="productbuyreturn">Shipping detail & Buy/Return Policy</label>
                <Editor
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onChange={handleBuyReturn}
                />
                <label htmlFor="detail">Details</label>
                <Editor
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onChange={handleDetail}
                />
                <Grid container style={{ marginTop: '15px' }}>
                  <Grid style={{ padding: '5px' }} xs={12} sm={12} item md={2}>
                    <h4>Categories</h4>
                    <Select value={category} onChange={handleCategories} fullWidth>
                      <MenuItem value="" disabled>
                        Please Select
                      </MenuItem>
                      {product
                        ? product.categories.map((c) => (
                            <MenuItem key={c.catId} id={c.catId} value={c.catName}>
                              {c.catName}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  </Grid>
                  <Grid style={{ padding: '5px' }} xs={12} sm={12} item md={2}>
                    <h4>Collections</h4>
                    <Select value={collection} multiple onChange={handleCollections} fullWidth>
                      {collectionsList.map((col) => (
                        <MenuItem
                          key={col.collectionId}
                          id={col.collectionId}
                          value={col.collectionId}
                        >
                          {col.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
                <Grid id="attribute" container>
                  {product
                    ? product.variations.map((i) => (
                        <>
                          <Grid style={{ padding: '3px' }} item sm={12} xs={12} md={2}>
                            <label htmlFor={`sku${i.product_variation_id}`}>SKU</label>
                            <TextField
                              defaultValue={i.sku}
                              id={`sku${i.product_variation_id}`}
                              variant="outlined"
                              fullWidth
                              type="text"
                            />
                          </Grid>
                          <Grid style={{ padding: '3px' }} item sm={12} xs={12} md={2}>
                            <label htmlFor={`quantity${i.product_variation_id}`}>Quantity</label>
                            <TextField
                              defaultValue={i.qty}
                              id={`quantity${i.product_variation_id}`}
                              variant="outlined"
                              fullWidth
                              type="number"
                            />
                          </Grid>
                          <Grid style={{ padding: '3px' }} item md={2} sm={12} xs={12}>
                            <label htmlFor={`costprice${i.product_variation_id}`}>Cost Price</label>
                            <TextField
                              defaultValue={i.cost_price}
                              id={`costprice${i.product_variation_id}`}
                              variant="outlined"
                              fullWidth
                              type="number"
                            />
                          </Grid>
                          <Grid style={{ padding: '3px' }} item md={2} sm={12} xs={12}>
                            <label htmlFor={`saleprice${i.product_variation_id}`}>Sale Price</label>
                            <TextField
                              defaultValue={i.sale_price}
                              id={`saleprice${i.product_variation_id}`}
                              variant="outlined"
                              fullWidth
                              type="number"
                            />
                          </Grid>
                          <Grid style={{ padding: '3px' }} item md={2} sm={12} xs={12}>
                            <label htmlFor={`discount${i.product_variation_id}`}>Discount</label>
                            <TextField
                              defaultValue={i.discount}
                              id={`discount${i.product_variation_id}`}
                              variant="outlined"
                              fullWidth
                              type="number"
                            />
                          </Grid>
                          <Grid style={{ padding: '3px' }} md={2} sm={12} xs={12}>
                            <label htmlFor={`weight${i.product_variation_id}`}>Weight</label>
                            <TextField
                              defaultValue={i.weight}
                              id={`weight${i.product_variation_id}`}
                              variant="outlined"
                              fullWidth
                              type="number"
                            />
                          </Grid>
                          <Grid
                            item
                            id={`showImages${i.product_variation_id}`}
                            md={12}
                            sm={12}
                            xs={12}
                          >
                            {i.primaryImage ? (
                              <span class="container">
                                <img
                                  src={i.primaryImage}
                                  id={`primaryImage${i.product_variation_id}`}
                                  style={{
                                    height: '150px',
                                    width: '150px',
                                    margin: '5px',
                                    borderRadius: '50%',
                                  }}
                                />
                                <div class="middle">
                                  <Button
                                    id={`primaryImage${i.product_variation_id}`}
                                    onClick={(e) =>
                                      handleImage(e, `primaryImage${i.product_variation_id}`)
                                    }
                                    className="text"
                                  >
                                    Click
                                  </Button>
                                </div>
                              </span>
                            ) : null}
                            {i.secondaryImage ? (
                              <span class="container">
                                <img
                                  src={i.secondaryImage}
                                  id={`secondaryImage${i.product_variation_id}`}
                                  style={{
                                    height: '150px',
                                    width: '150px',
                                    margin: '5px',
                                    borderRadius: '50%',
                                  }}
                                />
                                <div class="middle">
                                  <Button
                                    id={`secondaryImage${i.product_variation_id}`}
                                    onClick={(e) =>
                                      handleImage(e, `secondaryImage${i.product_variation_id}`)
                                    }
                                    className="text"
                                  >
                                    Click
                                  </Button>
                                </div>
                              </span>
                            ) : null}
                            {i.image_one ? (
                              <span class="container">
                                <img
                                  src={i.image_one}
                                  id={`image_one${i.product_variation_id}`}
                                  style={{
                                    height: '150px',
                                    width: '150px',
                                    margin: '5px',
                                    borderRadius: '50%',
                                  }}
                                />
                                <div class="middle">
                                  <Button
                                    id={`image_one${i.product_variation_id}`}
                                    onClick={(e) =>
                                      handleImage(e, `image_one${i.product_variation_id}`)
                                    }
                                    className="text"
                                  >
                                    Click
                                  </Button>
                                </div>
                              </span>
                            ) : null}
                            {i.image_two ? (
                              <span class="container">
                                <img
                                  src={i.image_two}
                                  id={`image_two${i.product_variation_id}`}
                                  style={{
                                    height: '150px',
                                    width: '150px',
                                    margin: '5px',
                                    borderRadius: '50%',
                                  }}
                                />
                                <div class="middle">
                                  <Button
                                    id={`image_two${i.product_variation_id}`}
                                    onClick={(e) =>
                                      handleImage(e, `image_two${i.product_variation_id}`)
                                    }
                                    className="text"
                                  >
                                    Click
                                  </Button>
                                </div>
                              </span>
                            ) : null}
                            {i.image_three ? (
                              <span class="container">
                                <img
                                  src={i.image_three}
                                  id={`image_three${i.product_variation_id}`}
                                  style={{
                                    height: '150px',
                                    width: '150px',
                                    margin: '5px',
                                    borderRadius: '50%',
                                  }}
                                />
                                <div class="middle">
                                  <Button
                                    id={`image_three${i.product_variation_id}`}
                                    onClick={(e) =>
                                      handleImage(e, `image_three${i.product_variation_id}`)
                                    }
                                    className="text"
                                  >
                                    Click
                                  </Button>
                                </div>
                              </span>
                            ) : null}
                          </Grid>
                        </>
                      ))
                    : null}
                </Grid>
                <Dialog open={open} onClose={() => setOpen(false)}>
                  <Grid container style={{ overflowY: 'scroll' }}>
                    <Grid item style={{ margin: '30px' }}>
                      <ImagePicker
                        images={inComingImages.map((image, i) => ({ src: image.url, value: i }))}
                        onPick={onPick}
                      />
                    </Grid>
                  </Grid>
                </Dialog>
              </Grid>
            </Grid>
          </Paper>
          <Paper style={{ marginTop: '10px', padding: '30px' }}>
            <Button
              variant="contained"
              onClick={() => SubmitData()}
              style={{ margin: '5px' }}
              color="primary"
            >
              Submit Data
            </Button>
          </Paper>
        </ThemeProvider>
      )}
    </>
  );
};

export default Product;
