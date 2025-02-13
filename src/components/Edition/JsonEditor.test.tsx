import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import JsonEditor from "./JsonEditor";
global.fetch = jest.fn();
// Mock de useNavigate()
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));


describe("JsonEditor Component", () => {
    it("Affiche les données", async () => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({
                grosTitre: { titre1: "Titre 1", titre2: "Titre 2", titre3: "Titre 3", titre4: "Titre 4" },
                menuValue: [{ menu: "Accueil" }, { menu: "Contact" }],
                presentationData: { soustitre: "Sous-titre", accroche: "Accroche", titre: "Titre Principal", texte: "Texte de présentation" },
                videoData: [],
                designData: [],
                engagementData: {
                    titre: {},
                    texte: {},
                    image: [],
                },
            }),
        });
      
        render(
            <BrowserRouter>  {/* Envelopper ton composant dans un BrowserRouter */}
              <JsonEditor />
            </BrowserRouter>
        );
      
        expect(screen.getByText("Chargement...")).toBeInTheDocument();
      
        await waitFor(() => screen.getByDisplayValue("Titre 1"));
        expect(screen.getByDisplayValue("Titre 1")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Titre 2")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Accueil")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Contact")).toBeInTheDocument();
    });
  
    it("MAJ des champs du formulaire", async () => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({
                grosTitre: { titre1: "Ancien Titre" },
                menuValue: [],
                presentationData: {},
                videoData: [],
                designData: [],
                engagementData:  {
                    titre: {},
                    texte: {},
                    image: [],
                },
            }),
        });
      
        render(
            <BrowserRouter>
              <JsonEditor />
            </BrowserRouter>
        );
      
        await waitFor(() => expect(screen.getByDisplayValue("Ancien Titre")).toBeInTheDocument());
      
        const input = screen.getByDisplayValue("Ancien Titre");
        fireEvent.change(input, { target: { value: "Nouveau Titre" } });
      
        expect(input).toHaveValue("Nouveau Titre");
    });

    // it("Envoie des nouvelles données", async () => {
    //     const updatedData = { grosTitre: { titre1: "Nouveau Titre" } };
    //     (fetch as jest.Mock).mockResolvedValueOnce({
    //         ok: true,
    //         json: jest.fn().mockResolvedValue({
    //             grosTitre: { titre1: "Ancien Titre" },
    //             menuValue: [],
    //             presentationData: {},
    //             videoData: [],
    //             designData: [],
    //             engagementData:  {
    //                 titre: {},
    //                 texte: {},
    //                 image: [],
    //             },
    //         }),
    //     });
    
    //     const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    //     render(
    //         <BrowserRouter>
    //             <JsonEditor />
    //         </BrowserRouter>
    //     );
    
    //     // Attendre que l'élément soit rendu
    //     const input = await screen.findByDisplayValue("Ancien Titre");
    //     fireEvent.change(input, { target: { value: "Nouveau Titre" } });
    
    //     const submitButton = await screen.findByText("Enregistrer !");
    //     fireEvent.click(submitButton);
    
    //     await waitFor(() => expect(fetch).toHaveBeenCalledWith("http://localhost:5000/save-json", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(updatedData),
    //     }));
    
    //     await waitFor(() => expect(alertMock).toHaveBeenCalledWith("Données enregistrées avec succès !"));
    
    //     alertMock.mockRestore();
    // });

    it('Erreurs de chargement', async () => {
        (fetch as jest.Mock).mockRejectedValueOnce(new Error("Erreur de chargement"));

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        render(
            <BrowserRouter>
                <JsonEditor />
            </BrowserRouter>
        );

        await waitFor(() => expect(consoleErrorSpy).toHaveBeenCalledWith("Erreur de chargement :", new Error("Erreur de chargement")));

        consoleErrorSpy.mockRestore();
    });

    it("Erreurs de sauvegarde", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValue({
                grosTitre: { titre1: "Ancien Titre" },
                menuValue: [],
                presentationData: {},
                videoData: [],
                designData: [],
                engagementData: {
                    titre: {},
                    texte: {},
                    image: [],
                },
            }),
        });
      
        (fetch as jest.Mock).mockRejectedValueOnce(new Error("Erreur serveur"));
      
        render(
            <BrowserRouter>  {/* Envelopper ton composant dans un BrowserRouter */}
              <JsonEditor />
            </BrowserRouter>
        );
      
        await waitFor(() => expect(screen.getByDisplayValue("Ancien Titre")).toBeInTheDocument());
      
        const submitButton = screen.getByText("Enregistrer !");
        fireEvent.click(submitButton);
      
        await waitFor(() =>
          expect(screen.queryByText("Données enregistrées avec succès !")).not.toBeInTheDocument()
        );
    });

    it('Naviguer vers editionPhoto', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValue({
                grosTitre: { titre1: "Ancien Titre" },
                menuValue: [],
                presentationData: {},
                videoData: [],
                designData: [],
                engagementData: {
                    titre: {},
                    texte: {},
                    image: [],
              },
            }),
        });
    
        render(
            <BrowserRouter>
                <JsonEditor />
            </BrowserRouter>
        );
    
        // Attendez que le bouton soit rendu après le chargement des données
        const button = await screen.findByRole('button', { name: /edition image/i });
    
        // Simulez un clic sur le bouton
        fireEvent.click(button);
    
        // Vérifiez que la navigation a été appelée avec le bon chemin
        expect(mockNavigate).toHaveBeenCalledWith('/editionPhoto');
    });

    
});
