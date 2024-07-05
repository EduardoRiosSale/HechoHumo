import { getProductsByCategory } from '../../data/items';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import hechohumo2 from '../../components/img/hechohumo2.png'
import { Link } from 'react-router-dom';
import Contador from '../../components/contador/contador';

function ItemList() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const { idCategory } = useParams();
    const params = useParams();
    console.log(params)

    console.log(idCategory)

useEffect(() => {
        setIsLoading(true);
        setError(null);

        getProductsByCategory(idCategory)
            .then(res => {
                setProducts(res);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err);
                setIsLoading(false);
            });
    }, [idCategory]);

    if (isLoading) {
        return <div>
            <div><img className='img' src={hechohumo2} /></div>
            Cargando productos...
            </div>;
    }

    if (error) {
        return <div>Error al cargar productos: {error.message}</div>;
    }

    return (
        <div className='productos'>
            <h1>Productos</h1>
            {products.length > 0 ? (
                products.map(product => (
                    <div key={product.id}>
                        <div className='lista'>
                            <img
                                src={product.img}
                                style={{ width: '100px', height: '100px' }}
                                onError={(e) => { e.target.src = 'path/to/placeholder/image.jpg'; }}
                                alt={product.categoria}
                            />
                            <div>Producto: {product.categoria}</div>
                            <div>Descripción: {product.descripcion}</div>
                            <div>Precio: ${product.precio}</div>
                            <Contador />
                            <button style={{ color: "#F9C200", borderRadius: "30px", borderColor: "#F9C200" }}>Agregar Producto</button>
                            <p>Stock: {product.stock}</p>
                            <Link to={`/Unidad/${product.id}`}>
                                <p style={{ color: "#F9C200" }}>Ver más</p>
                            </Link>
                        </div>
                    </div>
                ))
            ) : (
                <div>No hay productos disponibles en esta categoría.</div>
            )}
        </div>
    );
};

export default ItemList;