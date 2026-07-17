<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <title>mini-daily-expenses</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body>
    <div id="session-flash" class="bg-green-100 text text-green-800 p-3 mt-4 rounded mx-auto w-3xl">
        {{ session('success') }}
    </div>
    <div class="flex flex-col border border-slate-400 rounded-xl bg-slate-200 max-w-3xl mx-auto my-20 shadow-xl">
        <div class="p-4">
            <h1 class="text-slate-400 text-lg mb-4">Add Expenses</h1>
            <form action="{{ route('expenses.store') }}" method="POST" id="expensesForm">
                @csrf
                <input type="hidden" name="_method" id="methodInput" value="PUT" disabled>
                <div class="p-2 flex flex-col">
                    <label for="category" class="mb-1">Kategori</label>
                    <input type="text" id="editCategory" name="category"
                        class="py-1 px-2 rounded-lg border border-slate-400 text-black" placeholder="makan bro..."
                        required />
                </div>
                <div class="p-2 flex flex-col">
                    <label for="description" class="mb-1">Deskripsi</label>
                    <input type="text" id="editDescription" name="description"
                        class="py-1 px-2 rounded-lg border border-slate-400 text-black" required />
                </div>
                <div class="p-2 flex flex-col">
                    <label for="date" class="mb-1">Tanggal</label>
                    <input type="date" id="editDate" name="date"
                        class="py-1 px-2 rounded-lg border border-slate-400 text-black" />
                </div>
                <div class="p-2 flex flex-col">
                    <label for="amount" class="mb-1">Nominal</label>
                    <input type="text" id="editAmount" name="amount"
                        class="py-1 px-2 rounded-lg border border-slate-400 text-black" />
                </div>
                <button type="submit"
                    class="btnAction py-1 px-4 mt-3 rounded-lg border border-slate-400 ml-2 cursor-pointer">
                    Submit
                </button>
            </form>
        </div>
        <div class="p-4">
            <h1 class="text-slate-400 text-lg mb-5">Result:</h1>
            <div class="flex flex-col border border-slate-400 rounded-xl p-4 mb-2">
                <h2 class="text-md font-normal">Total Pengeluaran</h2>
                <p id="total" class="text-xl font bold ">Rp {{ number_format($total ?? 0, 0, ',', '.') }}
                </p>
            </div>
            <div class=" p-4 w-full border border-slate-400 rounded-xl">
                <table class="w-full">
                    <thead>
                        <tr class="text-left border-b border-b-slate-400">
                            <th>No.</th>
                            <th>Kategori</th>
                            <th>Deskripsi</th>
                            <th>Tanggal</th>
                            <th>Nominal</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($expenses as $expense)
                            <tr>
                                <td class="p-2">{{ $loop->iteration }}</td>
                                <td class="p-2">{{ $expense->category }}</td>
                                <td class="p-2">{{ $expense->description }}</td>
                                <td class="p-2">{{ $expense->date->translatedFormat('l, d F Y') }}
                                </td>
                                <td class="p-2">Rp {{ number_format($expense->amount ?? 0, 0, ',', '.') }}
                                </td>
                                <td class="p-2">
                                    <div class="flex gap-2">
                                        <button type="button" class="editBtn" data-id="{{ $expense->id }}"
                                            data-category="{{ $expense->category }}"
                                            data-description="{{ $expense->description }}"
                                            data-date="{{ $expense->date }}" data-amount="{{ $expense->amount }}">
                                            <i data-lucide="square-pen"></i>
                                        </button>
                                        <button type="button" class="delete-btn" data-id="{{ $expense->id }}" data-amount="{{ $expense->amount }}">
                                            <i data-lucide="trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script src="https://unpkg.com/lucide@latest"></script>
</body>

</html>
