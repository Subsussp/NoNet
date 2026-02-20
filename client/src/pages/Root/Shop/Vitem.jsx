import { Link } from "react-router-dom";
import { Heart, ShoppingBasket } from "lucide-react";

const Vitem = ({item})=> {
  return <li className="bg-mainele mb-[30px] overflow-hidden">
        <div className="w-full h-full bg-mainele flex items-center" >
        <Link to={`/items/${item._id}`}>
          <div className="listimg-con flex-shrink-0">
              <img draggable='false'
              src={item.img[0]}
              alt={`${item.name} photo`}
              className={`block object-cover`}
              />
          </div>
        </Link>
      <div className="ml-3 h-full">                               
            <h1 className="font-medium text-one">{item.name}</h1>
            <h1 className="font-medium text-[var(--two)]">{item.price} EGP</h1>
          <Link to={`/items/${item._id}`}>
            <p className="m-0 p-0 box-border">
              <span className="text-[var(--sa)] font-sans text-xl">
                <strong className="font-Main text-gray-500 font-semibold">Material :</strong> {item.material}
              </span>
            </p>
        <p className="m-0 p-0 box-border ">
          <span className=" font-sans text-[var(--sa)] text-lg">
            <strong className="font-sm text-gray-500 overflow-hidden text-ellipsis w-full font-Main font-semibold">Details :</strong> {item.desc}
          </span>
        </p>
        <p className="m-0 p-0 box-border">
          <span className="text-[var(--sa)] font-sans text-xl">
            <strong className="font-Main text-gray-500 font-semibold ">Size :</strong> {item.size}
          </span>
        </p>
        </Link>

        <div>&nbsp;</div>
        <div className="list-block flex items-center space-x-2">
  {/* <!-- Add to Cart Button --> */}
  <Link 
    className="addToCart bg-two hover:bg-[var(--sa)] text-one transition duration-700 ease-in-out p-2" 
    type="button" 
    title="Add to Cart" 
    to={`/cart/add-to-cart?pr_id=${item._id}`}
    >
    <ShoppingBasket/>
  </Link>

  {/* <!-- Add to Wishlist Button --> */}
  <button 
    className="wishlist btn-button bg-mainele transition duration-700 ease-in-out hover:bg-one hover:text-mainele text-one p-2" 
    type="button" 
    title="Add to Wish List" 
    onClick="wishlist.add('841','image/products/1569664820web-template.png');">
    <Heart/>
  </button>

  {/* <!-- Quick View Button (Using Fancybox) --> */}
  <a 
    className="iframe-link btn-button bg-mainele transition duration-700 ease-in-out hover:bg-two text-one p-2" 
    href="q?id=841" 
    title="Quick view" 
    data-fancybox-type="iframe">
    <i className="fa fa-eye"></i>
  </a>
</div>
      </div>
        </div>

</li>
}
export default Vitem