import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import ImageList from "./sliderAuto";

jest.useFakeTimers(); // Simule le passage du temps

describe("ImageList Component", () => {
  
  it("Affiche la première image", () => {
    jest.useFakeTimers();
    const { rerender } = render(<ImageList />);
  
    let images = screen.getAllByAltText("Fond d'écran");
    expect(images[0]).toHaveAttribute("src", "/image/surf1.png");
  
    act(() => {
        jest.advanceTimersByTime(14000);
      });
    rerender(<ImageList />);
    images = screen.getAllByAltText("Fond d'écran");
  
    expect(images[0]).toHaveAttribute("src", "/image/surf2.png");
  
    jest.useRealTimers();
  });

  it("Boucle après dernière image", async () => {
    jest.useFakeTimers();
    render(<ImageList />);
  
    const images = screen.getAllByAltText("Fond d'écran");
  
    for (let i = 0; i < 4; i++) {
        act(() => {
            jest.advanceTimersByTime(14000);
        });
      await screen.findByAltText("Fond d'écran suivant");
    }
  
    expect(images[0]).toHaveAttribute("src", "/image/surf1.png");
  
    jest.useRealTimers();
  });

  it("Applique l'animation ?", () => {
    render(<ImageList />);

    const images = screen.getAllByAltText("Fond d'écran");
    const animatedImageContainer = images[0].parentElement;
    
    expect(animatedImageContainer).toHaveStyle("transition: top 1.5s ease-in-out");
  });

//   it("Nettoie l'intervalle au démontage du composant", () => {
//     const { unmount } = render(<ImageList />);

//     unmount(); // Supprime le composant

//     expect(clearInterval).toHaveBeenCalled(); // Vérifie que l'intervalle est nettoyé
//   });

});
