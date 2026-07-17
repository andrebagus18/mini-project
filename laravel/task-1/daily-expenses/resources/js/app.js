window.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
});

setTimeout(() => {
    document.getElementById("session-flash")?.remove();
}, 3000);

document.querySelectorAll(".editBtn").forEach((editBtn) => {
    editBtn.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("editCategory").value =
            editBtn.dataset.category;
        document.getElementById("editDescription").value =
            editBtn.dataset.description;
        document.getElementById("editDate").value = editBtn.dataset.date;
        document.getElementById("editAmount").value = editBtn.dataset.amount;
        document.getElementById("expensesForm").action =
            `update/${editBtn.dataset.id}`;
        document.getElementById("methodInput").disabled = false;
        document.querySelector(".btnAction").textContent = "Update";
    });
});

document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", async (e) => {
        e.preventDefault();
        const id = button.dataset.id;
        const csrf = document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content");
        try {
            const response = await fetch(`/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": csrf,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            if (result.success) {
                button.closest("tr").remove();
                // realtime total dengan ajax
                const totalAmount = document.getElementById("total");
                if (totalAmount) {
                    //ambil amount yang dihapus
                    const deleteAmount = parseFloat(button.dataset.amount) || 0;
                    let currAmount =
                        parseFloat(
                            totalAmount.textContent.replace(/[^0-9]/g, ""),
                        ) || 0;
                    let newTotal = currAmount - deleteAmount;
                    totalAmount.textContent =
                        "Rp " +
                        new Intl.NumberFormat("id-ID", {
                            minimumFractionDigits: 0,
                        }).format(newTotal);
                }
            } else {
                alert("Gagal menghapus data dari server!");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    });
});
