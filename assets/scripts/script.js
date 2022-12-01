const d = document;
const $menuIcon = d.getElementById("menuIcon");

// carrusel de fotos
const $actualImage = d.getElementById("actualImage");
const $leftArrow = d.getElementById("leftArrow");
const $rightArrow = d.getElementById("rightArrow");

let imagesArray = [
  "image-product-1.jpg",
  "image-product-2.jpg",
  "image-product-3.jpg",
  "image-product-4.jpg",
];
console.log(imagesArray);
let imgIterator = 0;

const $imageVisorThumbnails = d.getElementById("imageVisorThumbnails");
//
const $cartIcon = d.getElementById("cartIcon");
const $navBar = d.getElementById("navBar");
const $Cart = d.getElementById("Cart");
const $QuantityVisor = d.getElementById("Quantity");

let Quantity = 0;
let cartQuantity = 0;

// LIGHTBOX
const $lightBox = d.getElementById("lightBox");
const $lightBoxBackground = d.getElementById("lightBoxBackground");
const $lightBoxActualImage = d.getElementById("lightBoxActualImage");
const $lightBoxThumbnails = d.getElementById("lightBoxThumbnails");
let lightBoxImgIterator = 0;
let lightBoxActive = false;

const thumbnailSelection = () => {
  for (el in Array.from($imageVisorThumbnails.children)) {
    if (el == imgIterator) {
      console.log("YES", el, imgIterator);
      $imageVisorThumbnails.children[el].classList.add("is-active");
      $lightBoxThumbnails.children[el].classList.add("is-active");
    } else {
      $imageVisorThumbnails.children[el].classList.remove("is-active");
      $lightBoxThumbnails.children[el].classList.remove("is-active");
    }
  }
};
// DELEGACIÓN DE EVENTOS

d.addEventListener("click", (e) => {
  // LATERAL MENU

  if (e.target.matches("#menuIcon") || e.target.matches("#closeIcon")) {
    $navBar.classList.toggle("nav-bar--hidden");
  }

  // CART BOX

  if (e.target.matches("#cartIcon")) {
    $Cart.classList.toggle("cart-box--hidden");
  }
  // DELETING ELEMENTS
  else if (e.target.matches(".delete-icon")) {
    d.getElementById("cartIsEmpty").classList.remove("cart-box--hidden");
    d.getElementById("cartWithProducts").classList.add("cart-box--hidden");
    Quantity = 0;
  } else {
    $Cart.classList.add("cart-box--hidden");
  }

  // MODIFICANDO LA ACTUAL IMAGE DESDE LAS MINIATURAS
  if (e.target.matches(`.image-visor__thumbnails img`)) {
    console.log(
      e.target.getAttribute("data-position"),
      imagesArray[imgIterator]
    );

    $actualImage.setAttribute(
      "src",
      `/images/${imagesArray[e.target.getAttribute("data-position") - 1]}`
    );
    imgIterator = e.target.getAttribute("data-position") - 1;

    thumbnailSelection();
  }

  //    Carrusel fotos

  if (e.target.matches("#leftArrow")) {
    if (imgIterator > 0) imgIterator--;
    else imgIterator = imagesArray.length - 1;
    $actualImage.setAttribute("src", `/images/${imagesArray[imgIterator]}`);

    //  AGREGANDO Y QUITANDO CLASE A LA MINIATURA
    thumbnailSelection();
  } else if (e.target.matches("#rightArrow")) {
    if (imgIterator < imagesArray.length - 1) imgIterator++;
    else imgIterator = 0;

    $actualImage.setAttribute("src", `/images/${imagesArray[imgIterator]}`);

    for (el in Array.from($imageVisorThumbnails.children)) {
      console.log(el, imgIterator);
      // Me hizo renegar porque usaba el === que significa igualdad total, y en realidad uno era número y el otro string, por ende no los reconocía como similares, al usar== solo compara los valores, no el formato, por lo que valida a true.También se podía lograr unificando los formatos antes de la comparación.
      if (el == imgIterator) {
        console.log("YES", el, imgIterator);
        $imageVisorThumbnails.children[el].classList.add("is-active");
      } else {
        $imageVisorThumbnails.children[el].classList.remove("is-active");
      }
    }
  }
  //
  // Quantity Selector
  //
  if (e.target.matches("#plusIcon")) {
    Quantity++;
    $QuantityVisor.innerHTML = Quantity;
  } else if (e.target.matches("#minusIcon") && Quantity !== 0) {
    Quantity--;
    $QuantityVisor.innerHTML = Quantity;

    // AGREGAR CLASE ACTIVA AL THUMBNAIL CORRESPONDIENTE A LA IMAGEN GRANDE

    // is-active
  }

  //  CART BUTTON
  if (e.target.matches("#cartButton") && Quantity !== 0) {
    d.getElementById("cartIsEmpty").classList.add("cart-box--hidden");

    d.getElementById("cartWithProducts").classList.remove("cart-box--hidden");

    $QuantityVisor.innerHTML = 0;

    // MODIFYING CART

    if (Quantity !== 0) cartQuantity = Quantity;
    d.querySelector(
      ".cart-box__with-products__quantity"
    ).textContent = `x${cartQuantity}`;
    d.querySelector(".cart-box__with-products__total").textContent = `$${
      cartQuantity * 125.0
    }`;

    Quantity = 0;
  }

  // CART EMPTY

  if (d.getElementById("cartIsEmpty").classList.contains("cart-box--hidden")) {
    // Quantity = 0;
    // $QuantityVisor.innerHTML = Quantity;
  }
  //

  // ACTIVANDO EL LIGHT BOX
  //

  // REVISAR ESTA SECCIÓN, YA ESTOY QUEMADO  jajaja
  if (e.target.matches("#actualImage")) {
    $lightBox.classList.remove("hidden");
    $lightBoxBackground.classList.remove("hidden");
  }

  // // DESACTIVANDO EL LIGHT BOX

  if (e.target.matches("#lightBoxCloseIcon")) {
    $lightBox.classList.add("hidden");
    $lightBoxBackground.classList.add("hidden");
  }

  // LIGHTBOX FUNCTIONS

  if (e.target.matches("#lightBoxLeftArrow")) {
    if (imgIterator > 0) imgIterator--;
    else imgIterator = imagesArray.length - 1;

    $actualImage.setAttribute("src", `/images/${imagesArray[imgIterator]}`);
    $lightBoxActualImage.setAttribute(
      "src",
      `/images/${imagesArray[imgIterator]}`
    );

    //  AGREGANDO Y QUITANDO CLASE A LA MINIATURA
    for (el in Array.from($imageVisorThumbnails.children)) {
      if (el == imgIterator) {
        console.log("YES", el, imgIterator);
        $imageVisorThumbnails.children[el].classList.add("is-active");
        $lightBoxThumbnails.children[el].classList.add("is-active");
      } else {
        $imageVisorThumbnails.children[el].classList.remove("is-active");
        $lightBoxThumbnails.children[el].classList.remove("is-active");
      }
    }
  } else if (e.target.matches("#lightBoxRightArrow")) {
    if (imgIterator < imagesArray.length - 1) imgIterator++;
    else imgIterator = 0;

    $actualImage.setAttribute("src", `/images/${imagesArray[imgIterator]}`);
    $lightBoxActualImage.setAttribute(
      "src",
      `/images/${imagesArray[imgIterator]}`
    );
    for (el in Array.from($imageVisorThumbnails.children)) {
      console.log(el, imgIterator);
      // Me hizo renegar porque usaba el === que significa igualdad total, y en realidad uno era número y el otro string, por ende no los reconocía como similares, al usar== solo compara los valores, no el formato, por lo que valida a true.También se podía lograr unificando los formatos antes de la comparación.
      if (el == imgIterator) {
        console.log("YES", el, imgIterator);
        $imageVisorThumbnails.children[el].classList.add("is-active");
        $lightBoxThumbnails.children[el].classList.add("is-active");
      } else {
        $imageVisorThumbnails.children[el].classList.remove("is-active");
        $lightBoxThumbnails.children[el].classList.remove("is-active");
      }
    }
  }

  // FINAL DEL LISTENER
});
