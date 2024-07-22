import { TaxonomyNode } from "../parseCsv";
import { buildTree } from "../buildTree";

describe("buildTree", () => {
  it("should build a tree structure from flat nodes", () => {
    const nodes: TaxonomyNode[] = [
      {
        level: 1,
        topic: "ESRS S1",
        subtopic: "S1-3",
        questionLabel:
          "Processes to remediate negative impacts and channels for own workforce to raise concerns",
      },
      {
        level: 2,
        topic: "ESRS S1",
        subtopic: "S1-3",
        questionLabel:
          "In this section, you will describe the processes in place to provide for or cooperate in remediation of negative impacts on people in your own workforce, as well as channels available to raise concerns and have them addressed",
      },
      {
        level: 3,
        topic: "ESRS S1",
        subtopic: "S1-3",
        questionLabel:
          "Please describe your processes to provide or contribute to remedy your material negative impacts on people in your own workforce",
      },
      {
        level: 4,
        topic: "ESRS S1",
        subtopic: "S1-3",
        questionLabel:
          "Do you assess that remedy provided for material negative impact on people in your own workforce is effective?",
      },
      {
        level: 5,
        topic: "ESRS S1",
        subtopic: "S1-3",
        questionLabel: "Please disclose how you assess it.",
      },
      {
        level: 3,
        topic: "ESRS S1",
        subtopic: "S1-3",
        questionLabel:
          "Please describe any channel you have in place for your own workforce to raise their concerns or needs directly.",
      },
      {
        level: 4,
        topic: "ESRS S1",
        subtopic: "S1-3",
        questionLabel:
          "Are you relying solely on information provided by your business relationships about existence of channels to raise concerns or needs?",
      },
      {
        level: 4,
        topic: "ESRS S1",
        subtopic: "S1-3",
        questionLabel:
          "Please describe your specific channels for your own workforce to raise concerns or needs",
      },
      {
        level: 4,
        topic: "ESRS S1",
        subtopic: "S1-3",
        questionLabel:
          "MAY Accessibility of third party mechanisms for own workforce",
      },
      {
        level: 4,
        topic: "ESRS S1",
        subtopic: "S1-3",
        questionLabel:
          "MAY People in own workforce that may be affected are able to access channels at level of undertaking they are employed by or contracted to work for",
      },
      {
        level: 5,
        topic: "ESRS S1",
        subtopic: "S1-3",
        questionLabel:
          "Disclosure of how people in own workforce / value chain workers that may be affected are able to access channels at level of undertaking they are employed by or contracted to work for",
      },
      {
        level: 3,
        topic: "ESRS S1",
        subtopic: "S1-3",
        questionLabel:
          "Do you have a grievance or complaints handling mechanism related to employee matters?",
      },
      {
        level: 3,
        topic: "ESRS S1",
        subtopic: "S1-3",
        questionLabel:
          "Please describe the process you have to support the availability of such channels.",
      },
      {
        level: 3,
        topic: "ESRS S1",
        subtopic: "S1-3",
        questionLabel:
          "Please explain how you track the issues raised and addressed, and how you ensure the effectiveness of the channels.",
      },
      {
        level: 3,
        topic: "ESRS S1",
        subtopic: "S1-3",
        questionLabel:
          "Do you assess that your own workforce is aware and trust these channels as a way to raise their concerns and have them addressed?",
      },
      {
        level: 4,
        topic: "ESRS S1",
        subtopic: "S1-3",
        questionLabel: "Please explain how you assess it.",
      },
      {
        level: 3,
        topic: "ESRS S1",
        subtopic: "S1-3",
        questionLabel:
          "Please specify if you have policies to protect the people that use the channels against retaliation.",
      },
      {
        level: 3,
        topic: "ESRS S1",
        subtopic: "S1-3",
        questionLabel:
          "Channel for raising concerns for people in own workforce / value chain workers / affected communities / consumers and end-users has not been adopted",
      },
      {
        level: 3,
        topic: "ESRS S1",
        subtopic: "S1-3",
        questionLabel:
          "Availability of channel for raising concerns is not supported for people in own workforce / value chain workers / affected communities / consumers and end-users",
      },
      {
        level: 3,
        topic: "ESRS S1",
        subtopic: "S1-3",
        questionLabel:
          "MAY Disclosure of timeframe for channel for raising concerns to be in place",
      },
      {
        level: 1,
        topic: "ESRS S1",
        subtopic: "S1-4",
        questionLabel:
          "Minimum Disclosure Requirement - action plans to manage material impacts, risks, and opportunities related to own workforce",
      },
      {
        level: 2,
        topic: "ESRS S1",
        subtopic: "S1-4",
        questionLabel: "Name or identifier of action (plan)",
      },
      {
        level: 2,
        topic: "ESRS S1",
        subtopic: "S1-4",
        questionLabel:
          "Name or identifier of related impacts, risks and opportunities",
      },
      {
        level: 2,
        topic: "ESRS S1",
        subtopic: "S1-4",
        questionLabel: "Name or identifier of related policy",
      },
      {
        level: 2,
        topic: "ESRS S1",
        subtopic: "S1-4",
        questionLabel: "Describe your action",
      },
      {
        level: 3,
        topic: "ESRS S1",
        subtopic: "S1-4",
        questionLabel: "Status of the action",
      },
      {
        level: 3,
        topic: "ESRS S1",
        subtopic: "S1-4",
        questionLabel: "Time horizon under which key action is to be completed",
      },
      {
        level: 3,
        topic: "ESRS S1",
        subtopic: "S1-4",
        questionLabel: "Year when key action is to be completed",
      },
      {
        level: 2,
        topic: "ESRS S1",
        subtopic: "S1-4",
        questionLabel:
          "Please describe the expected outcomes of your key action and how its implementation contributes to the achievement of policy objectives and targets",
      },
      {
        level: 2,
        topic: "ESRS S1",
        subtopic: "S1-4",
        questionLabel: "Describe the scope of the action",
      },
      {
        level: 2,
        topic: "ESRS S1",
        subtopic: "S1-4",
        questionLabel:
          "Is your key action taken for those harmed by your actual material impacts?",
      },
      {
        level: 3,
        topic: "ESRS S1",
        subtopic: "S1-4",
        questionLabel:
          "Have you taken actions to provide or enable remedy in relation to an actual material impact on your own workforce?",
      },
      {
        level: 4,
        topic: "ESRS S1",
        subtopic: "S1-4",
        questionLabel:
          "Disclosure of how action to provide or enable remedy in relation to actual material impact on own workforce / value chain workers / affected communities / consumers and end-users has been taken",
      },
      {
        level: 2,
        topic: "ESRS S1",
        subtopic: "S1-4",
        questionLabel:
          "Please describe quantitative and qualitative information regarding the progress of your actions disclosed in prior periods",
      },
      {
        level: 1,
        topic: "ESRS S1",
        subtopic: "S1-4",
        questionLabel:
          "Minimum Disclosure Requirement - resources to manage material impacts, risks, and opportunities related to own workforce",
      },
      {
        level: 2,
        topic: "ESRS S1",
        subtopic: "S1-4",
        questionLabel:
          "Disclosure of significant Opex and/or Capex required for the implementation of your action plan",
      },
      {
        level: 3,
        topic: "ESRS S1",
        subtopic: "S1-4",
        questionLabel: "Name or identifier of action (plan)",
      },
    ];

    const tree = buildTree(nodes);

    console.log(JSON.stringify(tree, null, 2)); // Afficher la structure de l'arborescence

    expect(tree).toBeInstanceOf(Array);
    expect(tree.length).toBe(3); // Deux nœuds de niveau 1
    expect(tree[0].children).toBeDefined(); // Le premier nœud a des enfants
    expect(tree[0].children!.length).toBeGreaterThan(0); // Vérifier qu'il y a des enfants
    expect(tree[1].children).toBeDefined(); // Le deuxième nœud a des enfants
  });
});
