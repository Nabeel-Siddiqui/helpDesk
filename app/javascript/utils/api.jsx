export const createTicket = async (ticketData) => {
  const url = "/api/v1/tickets/create";
  const token = document.querySelector('meta[name="csrf-token"]').content;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating ticket:", error);
    throw error;
  }
};
