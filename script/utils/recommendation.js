const {state_colors} = require("../global_constants");

const isNodeDone = (node) => {
    return node.style.backgroundColor === state_colors.done;
  }
  
const getEdgesBySource = (node_id, edges) => {
    return edges.filter((edge) => edge.source === node_id);
  };
  
const isTypeLeaf = (node) => {
    return node.type === "leafNode";
  }
  
const getNode = (node_id, nodes) => {
    return nodes.find((node) => node.id === node_id);
  }
  
const dfs = (node_id, nodes, edges) => {
    let node = getNode(node_id, nodes);
    if (isTypeLeaf(node) && !isNodeDone(node)) return node;
    if (isTypeLeaf(node)) return null;
    let selected_node = null;
    getEdgesBySource(node_id, edges).forEach((edge) => {
      if (selected_node == null) selected_node = dfs(edge["target"], nodes, edges);
      return selected_node;
    });
    return selected_node;
  }
  
const getRecommendedNode = (progress, nodes, edges) => {
    // get the first leaf node which is not done
    let source_node = nodes[0]["id"];
    let selected_node = dfs(source_node, nodes, edges);
    return selected_node;
  }
  
const getParent = (edges, target) => {
    for (let i = 0; i < edges.length; i++) {
      if (edges[i].target === target) {
        return edges[i];
      }
    }
    return null;
}
  
const getPathToRoot = (edges, recommended_node, stack) => {
    stack.push(recommended_node);
    let parent = getParent(edges, recommended_node);
    if (parent == null) return;
    getPathToRoot(edges, parent["source"], stack);
  }
  
const main = (progress) => {
    // extract nodes and edges
    progress = progress["state"];
    let key = Object.keys(progress);
    let { nodes, edges } = progress[key];
    // extract recommended nodes
    let recommended_node = getRecommendedNode(progress, nodes, edges);
    if (recommended_node == null) return null;
    // get stack
    let stack = [];
    if (recommended_node != null)
      getPathToRoot(edges, recommended_node["id"], stack);
    let { label, properties } = recommended_node["data"];
    return { recommended_node: { label, properties }, path_to_recommended_node: stack };
  }

  module.exports = { main };