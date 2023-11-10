const express = require( 'express' );
const mongoose = require( 'mongoose' );
const Product = require( './models/productModel' )
const app = express();

//middleware
app.use( express.json() );

//save product
app.post( '/product', async ( req, res ) =>
{
    try
    {
        const product = await Product.create( req.body )
        res.status( 200 ).json( product );
    } catch ( error )
    {
        console.log( error )
        res.status( 500 ).json( { message: error.message } )
    }
} )

//get all products
app.get( '/products', async ( req, res ) =>
{
    try
    {
        const products = await Product.find( {} );
        res.status( 200 ).json( products );
    } catch ( error )
    {
        console.log( error );
        res.status( 500 ).json( { message: error.message } )
    }
} )

//get single product
app.get( '/product/:id', async ( req, res ) =>
{
    try
    {
        const { id } = req.params;
        const product = await Product.findById( id );
        res.status( 200 ).json( product );
    } catch ( error )
    {
        console.log( error );
        res.status( 500 ).json( { message: error.message } )
    }
} )

//update product
app.put( '/products/:id', async ( req, res ) =>
{
    try
    {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate( id, req.body );

        if ( !product )
        {
            return res.status( 404 ).json( { message: `Product not found id : ${ id }` } )
        }
        const updatedProduct = await Product.findById( id, req.body );
        res.status( 200 ).json( updatedProduct )
    } catch ( error )
    {
        console.log( error );
        res.status( 500 ).json( { message: error.message } )

    }
} )

//delete product
app.delete( '/product/:id', async ( req, res ) =>
{
    try
    {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete( id );
        if ( !product )
        {
            return res.status( 404 ).json( { message: `Product not found id : ${ id }` } )
        }
        res.status( 200 ).json( { message: 'Product deleted successfully' } )
    } catch ( error )
    {
        console.log( error );
        res.status( 500 ).json( { message: error.message } )
    }
} )

mongoose
    .connect( 'mongodb+srv://root:root1234@firstapi.6x7thh1.mongodb.net/First-API?retryWrites=true&w=majority' )
    .then( () =>
    {
        console.log( 'MongoDB connected' );
        app.listen( 3000, () =>
        {
            console.log( ' Node api is running on port 3000' )
        } );
    } ).catch( ( err ) =>
    {
        console.log( 'error' )
    } );