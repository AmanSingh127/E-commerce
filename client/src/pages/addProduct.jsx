import './addProduct.css'

function AddProducts() {

    async function handleSubmit(e) {
        e.preventDefault()
        
        const formData= new FormData(e.target);

        try{
            const response = await fetch(
                "http://localhost:5000/api/products",
                {
                method: "POST",
                body: formData
                }
            )

            const data= await response.json()
            console.log(data);
            alert("Form Submitted successfully");
        }
        catch(err){
            console.error("Error: ",err);
        }
    }

    
    return (
        <div className="page-container">
            <div className="form-container">

                <div className="form-header">
                    <h1>Add New Product</h1>
                    <p>Add a new PC component to BuildSphere</p>
                </div>

                <form id="productForm" onSubmit={handleSubmit}>

                    {/* Category */}
                    <div className="form-group">
                        <label htmlFor="category_id">Category</label>
                        <select id="category_id" name="category_id" required>
                            <option value="">Select Category</option>
                            <option value="1">CPU</option>
                            <option value="2">Motherboard</option>
                            <option value="3">RAM</option>
                            <option value="4">GPU</option>
                            <option value="5">Storage</option>
                            <option value="6">Power Supply</option>
                            <option value="7">Cabinet</option>
                            <option value="8">CPU Cooler</option>
                        </select>
                    </div>

                    {/* Brand */}
                    <div className="form-group">
                        <label htmlFor="brand">Brand</label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            placeholder="e.g. Corsair"
                            required
                        />
                    </div>

                    {/* Product Name */}
                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="e.g. Corsair RM750e"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Enter product description..."
                            rows="5"
                            required
                        />
                    </div>

                    {/* Price + Stock */}
                    <div className="form-row">

                        <div className="form-group">
                            <label htmlFor="price">Price (₹)</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                placeholder="e.g. 7499"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="stock">Stock</label>
                            <input
                                type="number"
                                id="stock"
                                name="stock"
                                placeholder="e.g. 20"
                                min="0"
                                required
                            />
                        </div>

                    </div>

                    {/* Image URL */}
                    <div className="form-group">
                        <label htmlFor="image_url">Product Image URL</label>
                        <input
    type="file"
    id="image"
    name="image"
    accept="image/*"
    required
/>
                        <small>Enter the direct URL of the product image.</small>
                    </div>

                    {/* Status */}
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select id="status" name="status" required>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="button-container">
                        <button type="button" className="cancel-btn">Cancel</button>
                        <button type="submit" className="add-btn" >Add Product</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default AddProducts