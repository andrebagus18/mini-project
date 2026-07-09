window.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
});

setTimeout(() => {
    document.getElementById('session-flash')?.remove();
}, 3000);

document.querySelectorAll('.editBtn').forEach((editBtn) => {
    editBtn.addEventListener('click', () => {
        document.getElementById('editName').value = editBtn.dataset.name;
        document.getElementById('editPhone').value = editBtn.dataset.phone;
        document.getElementById('editEmail').value = editBtn.dataset.email;
        document.getElementById('editAddress').value = editBtn.dataset.address;
        document.getElementById('contactForm').action = `/update/${editBtn.dataset.id}`;
        document.getElementById('methodInput').disabled = false;
        document.querySelector('.btnAction').textContent = 'Update';
    });
});

document.querySelectorAll('.delete-btn').forEach((button) => {
    button.addEventListener('click', async () => {
        const id = button.dataset.id;
        const response = await fetch(`/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').textContent,
                'Accept': 'application/json'
            }
        });
        const result = await response.json();
        if (result.success) {
            button.closest('.contact-item').remove();
        }
    });
});