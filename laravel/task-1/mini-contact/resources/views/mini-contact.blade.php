<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <title>mini-contact</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body>
    <div id="session-flash" class="bg-green-100 text text-green-800 p-3 mt-4 rounded mx-auto w-3xl">
        {{ session('success') }}
    </div>
    <div class="flex border border-slate-400 rounded-xl bg-slate-200 max-w-3xl mx-auto mt-20 shadow-xl">
        <div class="p-4 border-r border-r-slate-300">
            <h1 class="text-slate-400 text-lg mb-4">Add Contact:</h1>
            <span class="text-black">ToDo</span>
            <form action="{{ route('contacts.store') }}" method="POST" id="contactForm">
                @csrf
                <input type="hidden" name="_method" id="methodInput" value="PUT" disabled>
                <div class="p-2">
                    <label for="name">Name</label>
                    <input type="text" id="editName" name="name"
                        class="todo-item py-1 px-2 rounded-lg border border-slate-400 text-black" placeholder="Jhon Doe"
                        required />
                </div>
                <div class="p-2">
                    <label for="name">Phone</label>
                    <input type="text" id="editPhone" name="phone"
                        class="todo-item py-1 px-2 rounded-lg border border-slate-400 text-black"
                        placeholder="+6281345678910" required />
                </div>
                <div class="p-2">
                    <label for="name">Email</label>
                    <input type="text" id="editEmail" name="email"
                        class="todo-item py-1 px-2 rounded-lg border border-slate-400 text-black"
                        placeholder="jhon@gmail.com" />
                </div>
                <div class="p-2">
                    <label for="name">Address</label>
                    <input type="text" id="editAddress" name="address"
                        class="todo-item py-1 px-2 rounded-lg border border-slate-400 text-black"
                        placeholder="Sun City" />
                </div>
                <button type="submit"
                    class=" btnAction py-1 px-4 mt-3 rounded-lg border border-slate-400 ml-2 cursor-pointer">
                    Add
                </button>
            </form>
        </div>
        <div class="p-4">
            <h1 class="text-slate-400 text-lg mb-5">Result:</h1>
            <div class="grid grid-cols-2 gap-4">
                @foreach ($contacts as $contact)
                    <div class="flex flex-col gap-2 contact-item">
                        <div class="flex flex-col gap-1 mb-1">
                            <span class="text-slate-400 text-md">Name</span>
                            <span class="text-black text-lg">{{ $contact->name }}</span>
                        </div>
                        <div class="flex flex-col gap-1 mb-1">
                            <span class="text-slate-400 text-md">Phone</span>
                            <span class="text-black text-lg">{{ $contact->phone }}</span>
                        </div>
                        <div class="flex flex-col gap-1 mb-1">
                            <span class="text-slate-400 text-md">Email</span>
                            <span class="text-black text-lg">{{ $contact->email }}</span>
                        </div>
                        <div class="flex flex-col gap-1 mb-1">
                            <span class="text-slate-400 text-md">Address</span>
                            <span class="text-black text-lg">{{ $contact->address }}</span>
                        </div>
                        <div class="flex gap-2">
                            <button type="button" class="editBtn" data-id="{{ $contact->id }}"
                                data-name="{{ $contact->name }}" data-phone="{{ $contact->phone }}"
                                data-email="{{ $contact->email }}" data-address="{{ $contact->address }}">
                                <i data-lucide="square-pen"></i>
                            </button>
                            <button type="button" class="delete-btn" data-id="{{ $contact->id }}">
                                <i data-lucide="trash"></i>
                            </button>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
    <script src="https://unpkg.com/lucide@latest"></script>

</body>

</html>
