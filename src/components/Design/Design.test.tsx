import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';  // Assurez-vous que jest-dom est importé pour les matchers comme 'toBeInTheDocument'
import Design from "./Design";  // Assurez-vous du bon chemin
import { useFetchData } from "../../data/useFetchData";

// Mock de useFetchData pour retourner des données fictives
jest.mock("../../data/useFetchData", () => ({
  useFetchData: jest.fn(),
}));

describe("Design Component", () => {
  it("Loading (console.log)", () => {
    // Espionner console.log pour vérifier qu'il n'y a pas de message d'erreur
    const logSpy = jest.spyOn(console, "log").mockImplementation();
  
    // Simuler l'état de chargement
    (useFetchData as jest.Mock).mockReturnValue({
      data: null,
      loading: true,  // Simule le chargement
      error: null,
    });
  
    // Rendu du composant
    render(<Design />);
  
    // Vérifier que le message "Loading data..." a été loggé
    expect(logSpy).toHaveBeenCalledWith("Loading data...");
  
    // Réinitialiser le spy après le test
    logSpy.mockRestore();
  });
  
  it("Error (console.log)", () => {
    // Espionner console.log
    const logSpy = jest.spyOn(console, "log").mockImplementation();

    // Simuler une erreur lors du fetch des données
    (useFetchData as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: "Erreur de récupération des données",
    });

    // Rendu du composant
    render(<Design />);

    // Vérification que console.log a bien été appelé avec le bon message d'erreur
    expect(logSpy).toHaveBeenCalledWith("Error: Erreur de récupération des données");

    // Réinitialiser le spy après le test
    logSpy.mockRestore();
  });

  it("Affichage : Données JSON + Filtre", () => {
    (useFetchData as jest.Mock).mockReturnValue({
      data: {
        designData: [
          {
            id: 1,
            affichage: true,
            image: "image1-Test.jpg",
            texte: "Texte affiché",
            titre: "Titre affiché",
          },
          {
            id: 2,
            affichage: false,
            image: "image2-Test.jpg",
            texte: "Texte caché",
            titre: "Titre caché",
          },
        ],
        grosTitre: { titre2: "Titre Principal" },
      },
      loading: false,
      error: null,
    });
  
    render(<Design />);
  
    expect(screen.getByText("Titre Principal")).toBeInTheDocument();
    expect(screen.getByText("Texte affiché")).toBeInTheDocument();
    expect(screen.getByAltText("Titre affiché")).toHaveAttribute("src", "./image/image1-Test.jpg");
  
    // Vérifie que l'élément avec affichage: false N'EST PAS affiché
    expect(screen.queryByText("Texte caché")).not.toBeInTheDocument();
  });

  it("Non Affichage si pas Données JSON", () => {
    (useFetchData as jest.Mock).mockReturnValue({
      data: {
        designData: [
          { id: 1, affichage: false, image: "image1-Test.jpg", texte: "Texte caché", titre: "Titre caché" },
        ],
        grosTitre: { titre2: "Titre Principal" },
      },
      loading: false,
      error: null,
    });
  
    render(<Design />);
  
    expect(screen.getByText("Titre Principal")).toBeInTheDocument();
    expect(screen.getByText("Aucune image disponible.")).toBeInTheDocument();
  });

  const mockData = {
    designData: [
      { id: 1, affichage: true, image: "image1.jpg", texte: "Texte 1", titre: "Titre 1" },
      { id: 2, affichage: true, image: "image2.jpg", texte: "Texte 2", titre: "Titre 2" },
    ],
    grosTitre: { titre2: "Titre Principal" },
  };

  beforeEach(() => {
    (useFetchData as jest.Mock).mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });
  });

  it("Passe à l'élément suivant 👉", () => {
    render(<Design />);
    
    const nextButton = screen.getByRole("button", { name: "👉" });
    fireEvent.click(nextButton);

    expect(screen.getByAltText("Titre 2")).toHaveAttribute("src", "./image/image2.jpg");
    expect(screen.getByText("Texte 2")).toBeInTheDocument();
  });

  it("Revient à l'élément précédent 👈", () => {
    render(<Design />);
    
    // Aller à l'élément suivant d'abord
    const nextButton = screen.getByRole("button", { name: "👉" });
    fireEvent.click(nextButton);

    // Puis revenir en arrière
    const prevButton = screen.getByRole("button", { name: "👈" });
    fireEvent.click(prevButton);

    expect(screen.getByAltText("Titre 1")).toHaveAttribute("src", "./image/image1.jpg");
    expect(screen.getByText("Texte 1")).toBeInTheDocument();
  });

  it("Va au dernier élément 👈 depuis le premier élement", () => {
    render(<Design />);
    
    const prevButton = screen.getByRole("button", { name: "👈" });
    fireEvent.click(prevButton);

    expect(screen.getByAltText("Titre 2")).toHaveAttribute("src", "./image/image2.jpg");
    expect(screen.getByText("Texte 2")).toBeInTheDocument();
  });

  it("Revient au premier élément 👉 au dernier élément", () => {
    render(<Design />);

    const nextButton = screen.getByRole("button", { name: "👉" });
    fireEvent.click(nextButton); // Aller à l'élément 2
    fireEvent.click(nextButton); // Revenir au début

    expect(screen.getByAltText("Titre 1")).toHaveAttribute("src", "./image/image1.jpg");
    expect(screen.getByText("Texte 1")).toBeInTheDocument();
  });
  
  
});
