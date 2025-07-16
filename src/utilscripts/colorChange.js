// app/utilscripts/colorChange.ts
export function startColorChange() {
  const topStrip = document.getElementById("top-strip");
  const foot = document.getElementById("foot");
  if (!topStrip || !foot) return;

  const colors = [
    // 🍊 ORANGES
    "rgba(255, 117, 24, 0.8)",   // Bright Carrot
    "rgba(255, 140, 0, 0.8)",    // Dark Orange
    "rgba(255, 165, 0, 0.8)",    // Pure Orange
    "rgba(230, 126, 34, 0.8)",   // Cinnabar Orange
    "rgba(255, 130, 0, 0.8)",    // Flame Orange
    "rgba(255, 99, 71, 0.8)",    // Tangy Tangerine
    "rgba(255, 153, 0, 0.8)",    // Tiger Orange
    "rgba(255, 128, 0, 0.8)",    // Crayola Orange
    "rgba(206, 124, 0, 0.8)",    // Warm Ochre
    "rgba(190, 110, 20, 0.8)",   // Rustic Spice
    "rgba(255, 102, 0, 0.8)",    // Blaze Orange
    "rgba(229, 89, 52, 0.8)",    // Ember Orange
    "rgba(214, 137, 16, 0.8)",   // Tawny Orange
    "rgba(205, 92, 92, 0.8)",    // Dusty Orange
    "rgba(233, 107, 20, 0.8)",   // Molten Lava

    // ✨ GOLDS
    "rgba(255, 215, 0, 0.8)",    // Classic Gold
    "rgba(218, 165, 32, 0.8)",   // Goldenrod
    "rgba(184, 134, 11, 0.8)",   // Dark Goldenrod
    "rgba(255, 193, 7, 0.8)",    // Amber Gold
    "rgba(245, 187, 87, 0.8)",   // Sunbeam
    "rgba(255, 174, 66, 0.8)",   // Mellow Gold
    "rgba(242, 169, 0, 0.8)",    // Spicy Mustard
    "rgba(234, 153, 16, 0.8)",   // Harvest Gold
    "rgba(250, 190, 88, 0.8)",   // Warm Gold
    "rgba(229, 170, 112, 0.8)",  // Toasted Bronze
    "rgba(233, 171, 70, 0.8)",   // Brushed Bronze
    "rgba(193, 110, 28, 0.8)",   // Ember Spice
    "rgba(255, 200, 84, 0.8)",   // Dandelion Gold
    "rgba(230, 180, 45, 0.8)",   // Autumn Glow
    "rgba(255, 179, 15, 0.8)",   // Corn Gold
    "rgba(204, 119, 34, 0.8)",   // Burnt Gold
    "rgba(232, 147, 45, 0.8)",   // Rustic Sunset

    // 🌿 GREENS
    "rgba(34, 139, 34, 0.8)",    // Forest Green
    "rgba(0, 128, 0, 0.8)",      // Pure Green
    "rgba(85, 107, 47, 0.8)",    // Dark Olive
    "rgba(107, 142, 35, 0.8)",   // Olive Drab
    "rgba(124, 252, 0, 0.8)",    // Lawn Green
    "rgba(173, 255, 47, 0.8)",   // Green Yellow
    "rgba(0, 100, 0, 0.8)",      // Deep Forest
    "rgba(154, 205, 50, 0.8)",   // Yellow Green
    "rgba(72, 128, 35, 0.8)",    // Fern Green
    "rgba(0, 168, 107, 0.8)",    // Persian Green
    "rgba(0, 150, 90, 0.8)",     // Deep Mint
    "rgba(34, 197, 94, 0.8)",    // Emerald
    "rgba(20, 184, 166, 0.8)",   // Aqua Teal
    "rgba(102, 187, 106, 0.8)",  // Fresh Herb
    "rgba(0, 128, 128, 0.8)",    // Teal
    "rgba(67, 160, 71, 0.8)",    // Spring Green
    "rgba(60, 179, 113, 0.8)",   // Medium Sea Green
    "rgba(38, 97, 64, 0.8)",     // Deep Jungle

    // 🫒 GOLDEN-GREEN CROSSOVERS
    "rgba(161, 136, 0, 0.8)",    // Olive Gold
    "rgba(128, 128, 0, 0.8)",    // Army Olive
    "rgba(153, 101, 21, 0.8)"    // Antique Bronze
  ];


  let headerIndex = 0;
  let footerIndex = Math.floor(colors.length / 2);

  function changeColors() {
    if (!topStrip || !foot) return;

    topStrip.style.transition = "background-color 1s ease";
    foot.style.transition = "background-color 1s ease";

    topStrip.style.backgroundColor = colors[headerIndex];
    foot.style.backgroundColor = colors[footerIndex];

    headerIndex = (headerIndex + 1) % colors.length;
    footerIndex = (footerIndex + 1) % colors.length;

    if (headerIndex === footerIndex) {
      footerIndex = (footerIndex + 1) % colors.length;
    }
  }

  changeColors(); // initial color set
  setInterval(changeColors, 7000);
}
