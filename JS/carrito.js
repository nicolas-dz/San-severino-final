let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));


const contenedorCarritoProductos =document.querySelector(".carrito-productos")
const contenedorCarritoAcciones =document.querySelector("#carrito-acciones")

let botonesEliminar =document.querySelectorAll(".carrito-boton-eliminar")
const botonVaciar = document.querySelector("#carrito-acciones-vaciar")
const botonComprar = document.querySelector(".carrito-acciones-comprar")



function cargarProductosCarrito (){
if(productosEnCarrito){
    

    
    contenedorCarritoProductos.classList.remove("disabled");
   
    contenedorCarritoAcciones.classList.add("disabled");
    
    contenedorCarritoProductos.innerHTML = "" ;

    productosEnCarrito.forEach(producto => {
        
    const div = document.createElement("div");
    div.classList.add("carrito-producto");
    div.innerHTML =  `
    <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
    <div class="carrito-producto-nombre">
        <small>titulo</small>
        <h3>${producto.titulo}</h3>
    </div>
    <div class="carrito-producto-cantidad">
        <small>cantidad</small>
        <p>${producto.cantidad}</p>
    </div>
    <div class="carrito-producto-precio">
        <small>precio</small>
        <p>${producto.precio}</p>
    </div>
    <div class="carrito-producto-subtotal">
        <small>subtotal</small>
        <p>$ ${producto.precio * producto.cantidad}</p>
    </div>
    <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
    `

    contenedorCarritoProductos.append(div);

});
actualizarProductosEliminar ();

}else {
    
    contenedorCarritoProductos.classList.add("disabled")
    
    contenedorCarritoAcciones.classList.add("disabled")

     
};


}
cargarProductosCarrito ();
actualizarTotal ()


function actualizarProductosEliminar () {
    botonesEliminar = document.querySelectorAll (".carrito-producto-eliminar");
    
    botonesEliminar.forEach (boton => {
      boton.addEventListener("click" , eliminarDelCarrito);
    });

    };

    function eliminarDelCarrito (e){
        const idBoton = e.currentTarget.id;
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)

        productosEnCarrito.splice(index, 1);

        cargarProductosCarrito() ;
        actualizarTotal ();
        localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));  
    };
    
    botonVaciar.addEventListener("click", vaciarCarrito)
    
    function vaciarCarrito () {
        Swal.fire({
            title: "¿Estas seguro?",
            text: "Se eliminaran todos los productos",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText : "No,seguir comprando",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si,vaciar carrito"
          }).then((result) => {
            if (result.isConfirmed) {
             
                productosEnCarrito.length = 0 ;
                localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));
                cargarProductosCarrito();
                actualizarTotal ();
               
              };
            })
          };
       
    

    function actualizarTotal (){
        const totalFinal = productosEnCarrito.reduce((acc,producto)=>acc + (producto.precio*producto.cantidad),0);
        total.innerText = `$ ${totalFinal}`;
    };

    botonComprar.addEventListener("click", comprarCarrito)
    
    function comprarCarrito() { 
        Swal.fire("Gracias por tu compra !");

        productosEnCarrito.length = 0 ;
        localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));
        cargarProductosCarrito();
        actualizarTotal ()
        

    }


