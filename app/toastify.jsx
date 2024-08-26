import React from 'react';

import { Bounce, Flip, Slide, ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Tost(){
  return (
    <div>
     <ToastContainer
position="bottom-center"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
 rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Flip}
 />
  
    </div>
  );
}

export default Tost