import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function Loader(props){
    const isLoading = props.isLoading;
    const color = props.color;
    const size = props.size;


    return <React.Fragment>
        {isLoading?<ClipLoader loading={isLoading} color={color} size={size}/>:props.children}
    </React.Fragment>
}