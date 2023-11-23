import "./Home.scss";
import Banner from './Banner/Banner';
import Category from './Category/Category';
import Products from "../Products/Products";
import { useEffect, useContext } from "react";
import { fetchDataFromApi } from "../../utils/Api";
import { Contex } from "../../utils/context";

const Home = () => {

    const {categories, setCategories, products, setProducts} = useContext(Contex);

    useEffect(() => {
        getProducts();
        getCategories();
    },[])

    const getProducts = () => {
        fetchDataFromApi("Api/products?populate=*").then(res => {
            // console.log(res)
            setProducts(res)
        });
    }

    const getCategories = () => {
        fetchDataFromApi("Api/categories?populate=*").then(res => {
            // console.log(res)
            setCategories(res)
        });
    }
    
    return (
        <div>
            <Banner/>
            <div className="main-content">
                <div className="layout">

                    <Category 
                        categories = {categories}
                    />

                    <Products 
                        products = {products} 
                        headingText = "Popular Products"
                    />

                </div>
            </div>
        </div>
    );
};

export default Home;

