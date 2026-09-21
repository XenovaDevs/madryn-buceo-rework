import L from "leaflet";

const getCertificationClass = (certification: string) => {
  if (certification === "Advanced OWD") return "dive-site-marker--advanced";
  if (certification === "Open Water Diver") return "dive-site-marker--open-water";
  return "dive-site-marker--scuba";
};

export function createDiveSiteIcon(index: number, certification: string, active: boolean) {
  return L.divIcon({
    className: "dive-site-marker-icon",
    html: `<span class="dive-site-marker ${getCertificationClass(certification)}${active ? " is-active" : ""}"><span>${String(index + 1).padStart(2, "0")}</span></span>`,
    iconSize: [46, 46],
    iconAnchor: [23, 23],
    tooltipAnchor: [0, -22],
  });
}
