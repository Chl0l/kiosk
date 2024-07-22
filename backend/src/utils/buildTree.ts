import { TaxonomyNode } from "./parseCsv";

export const buildTree = (nodes: TaxonomyNode[]): TaxonomyNode[] => {
  const rootNodes: TaxonomyNode[] = [];
  const levelMap: { [key: number]: TaxonomyNode[] } = {};

  nodes.forEach((node) => {
    const { level } = node;

    if (level === 1) {
      rootNodes.push(node);
    } else {
      const parentLevel = level - 1;
      const parentNodes = levelMap[parentLevel] || rootNodes;
      const parentNode = parentNodes[parentNodes.length - 1];

      if (!parentNode.children) {
        parentNode.children = [];
      }
      parentNode.children.push(node);
    }

    if (!levelMap[level]) {
      levelMap[level] = [];
    }
    levelMap[level].push(node);
  });

  console.log("rootNodes", rootNodes);
  return rootNodes;
};
