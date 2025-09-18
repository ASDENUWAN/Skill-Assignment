<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Validator;

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
        $validator = Validator::make($request->all(), [
            'product_name' => 'required|string|max:255|unique:products,product_name',
            'price' => ['required', 'numeric', 'min:0.01', 'regex:/^\d+(\.\d{1,2})?$/'],
            'description' => 'nullable|string'
        ], [
            'product_name.unique' => 'Product name already exists',
            'product_name.required' => 'Product name is required'
        ]);


        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->first()
            ], 422);
        }

        $product = Product::create($validator->validated());
        return response()->json(['message' => 'Product added', 'product' => $product], 201);
    }
}
