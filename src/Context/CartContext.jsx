import { createContext, useContext, useState } from 'react';
import Swal from 'sweetalert2';
import Modal from '../Components/Modal';

export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [progress, setProgress] = useState(0);

  const addProductToCart = ({ product, quantity_selected = 1 }) => {
    const productExistInCart = cartProducts.find(p => cartProducts.length > 0 && parseInt(product.id) === parseInt(p.id))
    if(productExistInCart){
      if ((productExistInCart.quantity_selected + quantity_selected) > product.stock)
        return Swal.fire('Atención', 'No hay más stock disponible para agregar al carrito', 'info');

      setCartProducts(cartProducts.map(p => 
        p.id === productExistInCart.id 
          ? { ...p, quantity_selected: p.quantity_selected + quantity_selected } 
          : p
      ));
      console.log('unidad agregada en producto existente')
      return showSuccessModal(productExistInCart);
    }

    const newProduct = {
      id: product.id,
      sku: product.sku,
      name: product.name,
      stock: product.stock,
      quantity_selected: parseInt(quantity_selected),
      category: product.category,
      sub_category: product.sub_category,
      brand: product.brand,
      img_base: product.img_base,
      price_list_1: product.price_list_1,
      price_list_2: product.price_list_2,
      price_list_3: product.price_list_3,
      price_list_4: product.price_list_4,
      price_list_5: product.price_list_5,
      price_list_6: product.price_list_6,
    }

    if(newProduct.quantity_selected > newProduct.stock)
      return Swal.fire('Atencion', 'No hay mas stock disponible para agregar al carrito', 'info')

    setCartProducts([...cartProducts, newProduct])
    showSuccessModal(newProduct);
    console.log('unidad nueva agregada')
  } 

  const deleteProductOfCart = ({ productID, quantity = 1 }) => {
    if(quantity === 1) {
      const product = cartProducts.find(product => parseInt(product.id) === parseInt(productID))
      return product.quantity_selected--
    }

    cartProducts.filter(product => parseInt(product.id) !== parseInt(productID))
  }

  const getTotalOfProducts = () => {
    return cartProducts.length
  }

  const showSuccessModal = (product) => {
    setShowModal(true);
    setProgress(1);
    setModalProduct(product);

    setTimeout(() => {
      setProgress(100);
    }, 150); 

    setTimeout(() => {
      setShowModal(false); 
      setProgress(0);
    }, 5000); 
  };

  return (
    <CartContext.Provider value={{ cartProducts, addProductToCart, deleteProductOfCart, getTotalOfProducts }}>
      {children}
      {showModal && <Modal progress={progress} product={modalProduct} />}
    </CartContext.Provider>
  )
}