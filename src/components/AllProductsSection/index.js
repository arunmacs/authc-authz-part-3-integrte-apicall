import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import ProductCard from '../ProductCard'
import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const JWT_TOKEN = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/products'
    const options = {
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedProductsData = data.products.map(product => ({
        title: product.title,
        id: product.id,
        brand: product.brand,
        price: product.price,
        rating: product.rating,
        imageUrl: product.image_url,
      }))
      this.setState({productsList: updatedProductsData, isLoading: false})
    }
  }

  renderProductsList = () => {
    const {productsList} = this.state

    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={100} width={100} />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return <>{isLoading ? this.renderLoader() : this.renderProductsList()}</>
  }
}

export default AllProductsSection
