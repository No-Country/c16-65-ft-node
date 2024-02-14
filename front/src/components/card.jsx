

function Card({ title, image, price }) {
  return (
    <div className="card  flex-col  w-28 h-56 items-center   border-solid bg-red-300 shadow-md rounded p-4  self-auto   box-border border-4  inline-block">
      <img src='https://content.eccediciones.com/productos/6764/cubierta_detective_comics_80_an%CC%83os_de_batman_WEB.jpg' alt={title} />
      <h2 className=" text-sm">{title}</h2>
      <p>{price}</p>
    </div>

     
  );
}

export default Card