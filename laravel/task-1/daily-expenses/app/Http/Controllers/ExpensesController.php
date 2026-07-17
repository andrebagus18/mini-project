<?php

namespace App\Http\Controllers;

use App\Models\Expenses;
use Illuminate\Http\Request;

class ExpensesController extends Controller
{
    public function index()
    {
        $expenses = Expenses::all();
        $total = $expenses->sum('amount');
        return view('daily-expenses', compact('expenses', 'total'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'category' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'date' => 'required|date',
            'amount' => 'required|numeric|min:0',
        ]);
        Expenses::create([
            'category' => $request->category,
            'description' => $request->description,
            'date' => $request->date,
            'amount' => $request->amount,
        ]);

        return redirect('/')->with('success', 'Expense added successfully!');
    }

    public function update(Request $request, $id)
    {
        $expenses = Expenses::findOrFail($id);
        $data = [
            'category' => $request->category,
            'description' => $request->description,
            'date' => $request->date,
            'amount' => $request->amount,
        ];
        $expenses->update($data);

        return redirect('/')->with('success', 'Expense updated successfully!');
    }

    public function destroy(Expenses $expenses)
    {
        $expenses->delete();

        return response()->json([
            'success' => true,
            'message' => 'Contact deleted successfully.'
        ]);
    }
}
