import React from 'react';
import {Helmet} from 'react-helmet';

interface propsType {
    title: string;
    description: string;
    keywords: string;
    img?: string;
}

const SEO: React.FC<propsType> = ({title, description, keywords, img}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description}/>
            <meta name="keywords" content={keywords}/>

            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>

            <meta property="og:image:width" content="400"/>
            <meta property="og:image:height" content="300"/>
            <meta property="og:image" content={img}/>

            <meta name="twitter:title" content={title}/>
            <meta name="twitter:description" content={description}/>
        </Helmet>
    );
}

export default SEO;