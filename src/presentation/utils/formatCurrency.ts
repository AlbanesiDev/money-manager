function formatCurrency(amount: number) {
  const parts = amount.toFixed(2).toString().split(".");
  const formattedInt = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `$${formattedInt},${parts[1]}`;
}

export { formatCurrency };
