<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Database\QueryException;

class ProductController extends Controller
{
    // GET /api/products
    public function index()
    {
        return response()->json(Product::orderBy('created_at', 'desc')->get());
    }

    // POST /api/products
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_name' => 'required|string|max:255|unique:products,product_name',
            'price' => ['required', 'numeric', 'min:0.01', 'regex:/^\d+(\.\d{1,2})?$/'],
            'description' => 'nullable|string'
        ]);

        try {
            $product = Product::create($validated);
            return response()->json(['message' => 'Product added', 'product' => $product], 201);
        } catch (QueryException $e) {
            if ($e->getCode() === '23000') {
                return response()->json(['message' => 'Product name already exists'], 409);
            }
            return response()->json(['message' => 'Database error'], 500);
        }
    }
}
