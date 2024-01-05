//proyecto carrito js
//crear un carrito de compras en javascript con funciones para agregar y elimin
//variables
const carrito=document.querySelector('#carrito');
const contenedorCarrito=document.querySelector('#lista-carrito tbody');
const VaciarCursos=document.querySelector('#vaciar-carrito');
const listaCursos=document.querySelector('#lista-cursos')
let articulos=[]

cargarEventos();
//eventos vargados
function cargarEventos(){
listaCursos.addEventListener('click',agregarCurso)
carrito.addEventListener('click',eliminar)
VaciarCursos.addEventListener('click',vaciar)


}
//boton de vaciar

function vaciar(){
    articulos=[]
    limpiar()
    } 
//aqui se agrega los cursos

function agregarCurso(e){

    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado=e.target.parentElement.parentElement
        leerDatos(cursoSeleccionado)
    }
   
}
// aqui se leen los datos por mediante un objeto
function leerDatos(curso){

    const DatosCurso={

        imagen:curso.querySelector('img').src,
        titulo:curso.querySelector('h4').textContent,
        precio:curso.querySelector('.precio span').textContent,
        id:curso.querySelector('a').getAttribute('data-id'),
        cantidad:1

    }
    //revisar si en el carrito esta en el elemento
    const existe=articulos.some(curso=>curso.id===DatosCurso.id)
    console.log(existe)
    if(existe){
       const cursos=articulos.map(curso=>{
        if(curso.id===DatosCurso.id){
            curso.cantidad++;
            return curso
        }else{
            return curso
        }
       })
       articulos= [...cursos]
    }else{

        articulos=[...articulos,DatosCurso]
    }

   
    
    console.log(articulos)
carritoHtml();


}
//aqui se iteran los elementos del objeto y se muestran en el carrito
function carritoHtml(){
    limpiar();
articulos.forEach(curso=>{
    const row=document.createElement('tr')
    row.innerHTML=`
    <td>
    <img src='${curso.imagen}'width='100'>
    
    </td>
    <td>
    ${curso.titulo}
    
    </td>
    <td>
    ${curso.precio}
    </td>
    <td>
    ${curso.cantidad}
    </td>
    <td>
    <a href="#" class="borrar-curso" data-id=${curso.id}>X</a>

    </td>
    
    
    `
    contenedorCarrito.appendChild(row);
})
//limpiamos el html
}
function limpiar(){
    contenedorCarrito.innerHTML=''
}
//eliminar curso

function eliminar(e){
if(e.target.classList.contains('borrar-curso')){
    const  cursoId=e.target.getAttribute('data-id')
    articulos=articulos.filter(curso=>curso.id!==cursoId)
    console.log(articulos)
carritoHtml();
}
//vaciar carrito


}