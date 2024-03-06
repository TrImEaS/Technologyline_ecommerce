export function processProducts (productos) {
  const resultado = {
    categories: [],
  }

  productos.forEach((producto) => {
    const { cat_desc, subcat_desc, brand_desc, item_desc } = producto

    // Ignorar productos con item_desc igual a "PRUEBA"
    if (item_desc.toUpperCase() === "PRUEBA") {
      return
    }

    // Ignorar categorías que contengan "Categoria" en el nombre
    if (cat_desc.toLowerCase().includes("rubro")) {
      return
    }

    // Verificar si la categoría ya existe en el resultado
    const categoriaExistente = resultado.categories.find(
      (cat) => cat.name === cat_desc
    )

    if (!categoriaExistente) {
      const nuevaCategoria = {
        name: cat_desc,
        subcategories: [],
      }
      resultado.categories.push(nuevaCategoria)
    }

    // Ignorar subcategorías que contengan "Subcategoria" en el nombre
    if (subcat_desc.toLowerCase().includes("rubro")) {
      return
    }

    // Verificar si la subcategoría ya existe en la categoría
    const categoriaActual = resultado.categories.find(
      (cat) => cat.name === cat_desc
    )
    const subcategoriaExistente = categoriaActual.subcategories.find(
      (subcat) => subcat.name === subcat_desc
    )

    if (!subcategoriaExistente) {
      const nuevaSubcategoria = {
        name: subcat_desc,
        brands: [],
      }
      categoriaActual.subcategories.push(nuevaSubcategoria)
    }

    // Agregar la marca a la subcategoría
    const subcategoriaActual = categoriaActual.subcategories.find(
      (subcat) => subcat.name === subcat_desc
    )
    subcategoriaActual.brands.push(brand_desc)
  })

  return resultado
}