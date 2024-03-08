function transformProduct(product) {
  const itemDesc = product.item_desc;

  // Expresión regular para extraer el EAN
  const eanRegex = /EAN:\s*(\d+)/;
  const eanMatch = itemDesc.match(eanRegex);
  
  // Filtrar el nombre y obtener el EAN si existe
  const filteredName = eanMatch ? itemDesc.replace(eanRegex, '').trim() : itemDesc.trim();
  const ean = eanMatch ? eanMatch[1] : '';

  const {
    ID: id,
    item_code: sku,
    "L. Precios C/Imp": price,
    "DEPO. TOTAL DISPO.": stock,
    cat_desc: category,
    subcat_desc: sub_category,
    brand_desc: brand,
  } = product;

  return {
    id,
    name: filteredName,
    sku,
    price,
    stock,
    category,
    sub_category,
    brand,
    ean,
  };
}

function filterProduct(product) {
  // Ignorar productos con item_desc igual a "PRUEBA"
  if (product.name === undefined || product.name.trim() === "" || product.name.toUpperCase() === "PRUEBA") {
    return false
  }
  
  // Ignorar categorías que contengan "Categoria" en el nombre
  if (product.category.toLowerCase().includes("rubro")) {
    return false
  }

  // Ignorar subcategorías que contengan "Subcategoria" en el nombre
  if (product.sub_category.toLowerCase().includes("rubro")) {
    return false
  }

  // Ignorar si el precio es menor a 1000
  if (parseInt(product.price) <= 1000) {
    return false
  }

  if (product.stock < 3){
    return false
  }
  // Producto válido si pasa todas las condiciones
  return true
}

export function productsFilter(products) {
  const filterProducts = products.map(transformProduct).filter(filterProduct)
  return filterProducts
}

// export function categoriesFilter(products) {
//   const resultado = {
//     categories: [],
//   }

//   const transformedProducts = products.map(transformProduct).filter(filterProduct)
//   transformedProducts.forEach((product) => {

//     // Verificar si la categoría ya existe en el resultado
//     let categoriaExistente = resultado.categories.find(
//       (cat) => cat.name === product.category
//     )

//     if (!categoriaExistente) {
//       const nuevaCategoria = {
//         name: product.category,
//         subcategories: [],
//       }
//       resultado.categories.push(nuevaCategoria)
//       categoriaExistente = nuevaCategoria
//     }

//     // Verificar si la subcategoría ya existe en la categoría
//     let subcategoriaExistente = categoriaExistente.subcategories.find(
//       (subcat) => subcat.name === product.sub_category
//     )

//     if (!subcategoriaExistente) {
//       const nuevaSubcategoria = {
//         name: product.sub_category,
//         brands: [],
//       }
//       categoriaExistente.subcategories.push(nuevaSubcategoria)
//       subcategoriaExistente = nuevaSubcategoria
//     }

//     // Agregar la marca a la subcategoría si no existe
//     if (!subcategoriaExistente.brands.includes(product.brand)) {
//       subcategoriaExistente.brands.push(product.brand)
//     }
//   })

//   return resultado
// }

export function getAllCategories(products) {
  const categories = []
  
  const transformedProducts = products.map(transformProduct).filter(filterProduct)

  transformedProducts.forEach((product) => {
      // Verificar si la categoría ya existe en el resultado
      let categoriaExistente = categories.find( (cat) => cat.name === product.category )
    
      if (!categoriaExistente) {
        const nuevaCategoria = { name: product.category }
        categories.push(nuevaCategoria)
      }
  })

  return categories
}

export function getAllSubCategories(products) {
  const subCategories = []
  
  const transformedProducts = products.map(transformProduct).filter(filterProduct)

  transformedProducts.forEach((product) => {

    // Verificar si la subcategoría ya existe en la categoría
    let subcategoriaExistente = subCategories.find( (subcat) => subcat.name === product.sub_category )

    if (!subcategoriaExistente) {
      const nuevaSubcategoria = { name: product.sub_category }
      subCategories.push(nuevaSubcategoria)
    }
  })

  return subCategories
}

export function getAllBrands(products) {
  const brands = []
  
  const transformedProducts = products.map(transformProduct).filter(filterProduct)

  transformedProducts.forEach((product) => {
    // Verificar si la brand ya existe
    let brand = brands.find((brand) => brand.name === product.brand )

    if (!brand) {
      const newBrand = { name: product.brand }
      brands.push(newBrand)
    }
  })

  return brands
}