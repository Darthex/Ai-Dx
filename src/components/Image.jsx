import React from "react";

export default function Image(props) {


    return(
        <div className='image-section'>
            {
                props.isLoading ?
                    <div className='loader'></div>
                    :
                    props.isError ?
                        <div className='image-error'>Error. Try again...</div>
                        :
                        <img src={props.url && props.url} alt='' className='generated-image'/>
            }
        </div>
    )
}
