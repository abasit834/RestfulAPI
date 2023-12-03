const express=require("express");
const app=express();

app.use(express.json());

const products=[
{
    title:"LCD",
    company:"TCL"
},
{
    title:"PS5",
    company:"Sony"
},
{
    title:"XBOX",
    company:"Microsoft"
}
];

app.get("/",(req,res)=>{
    res.send("Hello World!");
});

app.get("/api/products",(req,res)=>{
        res.send(products);
});

app.get("/api/products/:index",(req,res)=>{
    if(!products[req.params.index])
    return res.status(404).send("Page Not Available");
    res.send(products[req.params.index]);
});

app.put("/api/products/:index",(req,res)=>{
    console.log(req.body);

    products[req.params.index].title=req.body.title;
    products[req.params.index].company=req.body.company;
    res.send(products[req.params.index]);
});

app.delete("/api/products/:index",(req,res)=>{
    if(req.params.index > products.length-1)
    {
        res.send("Error 404 : index not found");
    }
    products.splice(req.params.index,1);
    res.send("Element deleted successfully");
});

app.post("/api/products/",(req,res)=>{
        console.log(req.body);
        products.push(req.body);
        res.send(products);
});


app.listen(8080);