import { MedicineProductDetails } from "@/types/medicine-products";

interface DescriptionTabProps {
  product: MedicineProductDetails;
}

export function DescriptionTab({ product }: DescriptionTabProps) {
  const defaultDescription = {
    general:
      "Although it's typically considered safe, excessive consumption can lead to side effects. Therefore, it's recommended to consult a healthcare professional before using moringa, especially if you're pregnant, nursing, or taking other medications. This balanced approach allows for the benefits of moringa while recognizing the importance of proper usage and caution.",
    medicalUses: {
      antioxidant:
        "Moringa is packed with antioxidants that help fight oxidative stress and inflammation in the body.",
      antiDiabetic:
        "Some studies have shown that moringa leaves might lower blood sugar levels, making it a valuable supplement for managing diabetes.",
      heartHealth:
        "The plant has been linked to reduced cholesterol levels, which is vital for heart health.",
      antiCancer:
        "Certain compounds in moringa, such as niazimicin, have been found to suppress the growth of cancer cells in laboratory studies.",
      immuneSupport:
        "With its high vitamin C content, moringa can boost the immune system.",
      digestiveAid:
        "Moringa can help in treating digestive disorders due to its anti-inflammatory properties.",
    },
  };

  const description = product.description || defaultDescription.general;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Medical Uses:
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">
              Antioxidant Properties:
            </h4>
            <p className="text-gray-700">
              {defaultDescription.medicalUses.antioxidant}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-2">
              Anti-Diabetic Effects:
            </h4>
            <p className="text-gray-700">
              {defaultDescription.medicalUses.antiDiabetic}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-2">Heart Health:</h4>
            <p className="text-gray-700">
              {defaultDescription.medicalUses.heartHealth}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-2">
              Anti-Cancer Properties:
            </h4>
            <p className="text-gray-700">
              {defaultDescription.medicalUses.antiCancer}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-2">Immune Support:</h4>
            <p className="text-gray-700">
              {defaultDescription.medicalUses.immuneSupport}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-2">Digestive Aid:</h4>
            <p className="text-gray-700">
              {defaultDescription.medicalUses.digestiveAid}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
