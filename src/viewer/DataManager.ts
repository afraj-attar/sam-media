import { PartData } from "./components/viewer";

export const fetchPartData = (id: string): PartData | undefined => {

    switch (id) {
        case "One":
            return PartDataArray[0];
        case "Two":
            return PartDataArray[1];
        case "Three":
            return PartDataArray[2];
        case "Four":
            return PartDataArray[3];
        case "Five":
            return PartDataArray[4];
        default:
            return undefined;
    }

};

const PartDataArray: PartData[] = [
    {
        title: "Fibula",
        content: `The fibula or calf bone is a leg bone on the lateral side of the tibia, to which it is connected above and below. 
        It is the smaller of the two bones and, in proportion to its length, the most slender of all the long bones. 
        Its upper extremity is small, placed toward the back of the head of the tibia, 
        below the knee joint and excluded from the formation of this joint.`,
        image: "https://upload.wikimedia.org/wikipedia/commons/0/03/3D_Medical_Animation_Fibula_Structure.jpg"
    },
    {
        title: "Rib Cage",
        content: `The rib cage, as an enclosure that comprises the ribs,
         vertebral column and sternum in the thorax of most vertebrates, 
         protects vital organs such as the heart, lungs and great vessels.`,
        image: "https://upload.wikimedia.org/wikipedia/commons/8/88/Gray112.png"
    },
    {
        title: "Skull",
        content: `The skull is a bone structure that forms the head in vertebrates. 
        It supports the structures of the face and provides a protective cavity for the brain.
        The skull is composed of two parts: the cranium and the mandible.`,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Lateral_head_skull.jpg/800px-Lateral_head_skull.jpg"
    },
    {
        title: "Bone",
        content: `Bones are rigid organs that form part of the endoskeleton of vertebrates. 
        They function to move, support, and protect the various organs of the body, produce red and white blood cells and store minerals.`,
        image: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Left_femur_of_extinct_elephant%2C_Alaska%2C_Ice_Age_Wellcome_L0057714.jpg"
    },
];