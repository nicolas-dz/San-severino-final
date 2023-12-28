 let productos =[];

 fetch("./js/productos.json")
 .then (response => response.json())
 .then (data => {
   productos = data ;
   cargarProductos(productos);
  })
 .catch((response) => {console.log("Error en la carga de datos.")})
 .finally(()=> {console.log("Proceso Finalizado")})




    const contenedorProductos = document.querySelector("#contenedor-productos");
    const botonesCategorias = document.querySelectorAll (".boton-producto");
    let productoAgregar = document.querySelectorAll (".producto-agregar");
    const numerito =document.querySelector (".numerito");

    function cargarProductos(productosElegidos) {

        contenedorProductos.innerHTML = "";

        productosElegidos.forEach(producto => {

            const div = document.createElement("div");
            div.classList.add ("producto");
            div.innerHTML = `<img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">agregar</button>
            </div>`;
            contenedorProductos.append(div);

        })
        actualizarBotones();
    }

    

    botonesCategorias.forEach(boton =>{
        boton.addEventListener("click",(e)=> {

            botonesCategorias.forEach(boton=> boton.classList.remove("active"));
            e.currentTarget.classList.add("active");

            const productosBoton = productos.filter (producto=>producto.categoria.id === e.currentTarget.id)
            
            cargarProductos(productosBoton);
        })

    });

    function actualizarBotones () {
    productoAgregar = document.querySelectorAll (".producto-agregar");
    
    productoAgregar.forEach (boton => {
      boton.addEventListener("click" , agregarAlCarrito);
    })

    };

    let productosEnCarrito ;
    let productosEnCarritoLS = localStorage.getItem("productos-en-carrito")

    if (productosEnCarritoLS) {
      productosEnCarrito = JSON.parse(productosEnCarritoLS) ;
      actualizarNumerito ();
    } else {
      productosEnCarrito =[];
    }

    function agregarAlCarrito (e) {
      Toastify({
        text: "Producto agregado",
        duration: 2000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right,  #0B2027, #1D3354)",
        },
        onClick: function(){} // Callback after click
      }).showToast();

      const idBoton = e.currentTarget.id;
      const productoAgregado = productos.find(producto => producto.id === idBoton);

      if (productosEnCarrito.some(producto => producto.id === idBoton)){
      const index = productosEnCarrito.findIndex (producto => producto.id === idBoton);
      productosEnCarrito[index].cantidad++;

      } else {
      productoAgregado.cantidad = 1;
      
      productosEnCarrito.push(productoAgregado);}
      actualizarNumerito ();
      
      localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
   };

   function actualizarNumerito (){
      let nuevoNumerito = productosEnCarrito.reduce((acc,producto) => acc+producto.cantidad, 0);
      numerito.innerText = nuevoNumerito ;
   };



   




