import ImageSlider from "./components/ImageSlider";

export default function Sobre() {
  return (
    <div className="w-full">
      <aside className="-mx-1 -mt-12 mb-12 md:-mx-4 lg:-mx-12">
        <img className="aspect-[16/4] w-full" src="/dualsense-foco.jpg" />
      </aside>

      <ImageSlider />
    
    </div>
  );
}
