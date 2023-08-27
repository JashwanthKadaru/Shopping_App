import './App.css';
import Drawer from './components/Drawer';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Hamburger from 'hamburger-react'
function App() {
  const [currrentProduct, setCurrentProduct] = useState({});
  const [globalUsername, setGlobalUsername] = useState('');
  const [ searchText, setSearchText ] = useState('');
  const [ assistText, setAssistText ] = useState('');
  const [ isLogged, setIsLogged ] = useState('');
  const [ isVerified, setIsVerified] = useState('')

  const [productList, setProductList] = useState([{name: 'product name'}, {name: 'product name'}, {name: 'product name'}, {name: 'product name'}, {name: 'product name'},{name: 'product name'}, {name: 'product name'}, {name: 'product name'}, {name: 'product name'}, ]);
  
  const [purchasesList, setPurchasesList] = useState([{name: 'product name'}, {name: 'product name'}, {name: 'product name'}, {name: 'product name'}, {name: 'product name'},{name: 'product name'}, {name: 'product name'}, {name: 'product name'}, {name: 'product name'}, ]);

  const [cartList, setCartList] = useState([{}, {}, {}, {}, {}, {}]);

  const onSearch = () => {
    return {}
  }

  const onClickProduct = () => {
    return {}
  }
  
  return (
    <div className='app-body'>

        {/* side drawer for menu and credits and app name     */}
        <div className='app-drawer-box overlay'>
          <Drawer isLogged={isLogged} setIsLogged={setIsLogged} isVerfied={isVerified} setIsVerified={setIsVerified}/>
        </div>

        <div className='app-drawer-box'>
        </div>
        {/* Outlet section to dynamically change content */}
        <div className='app-display-box'>

          <div className='ham-div'>
            <Hamburger size={20} color={'#a805c8'} className='ham'/>
          </div>
          <Outlet context={{searchText, setSearchText, productList, setProductList, onSearch, onClickProduct, purchasesList, setPurchasesList, cartList, setCartList, isLogged, setIsLogged, isVerified, setIsVerified, assistText, setAssistText, globalUsername, setGlobalUsername, currrentProduct, setCurrentProduct}}/>
        </div>
    </div>
  )
}

export default App;
