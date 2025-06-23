export default function Footer() {
  console.log("Footer rendered"); // sanity check

  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = today.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  return (
    <footer className="text-white text-center py-3 foot" id="foot">
      <p className="mb-0">{formattedDate} - Aurum domus all rights reserved!</p>
    </footer>
  );
}
