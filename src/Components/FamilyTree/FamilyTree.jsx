import React, { useState, useEffect, useRef } from 'react';
import './FamilyTree.css';
import treeData from '../../assets/all_families.json';



const FamilyTree = ({ selectedFamilies }) => {
    const [expandedNodes, setExpandedNodes] = useState([]);
    const [pinnedNodes, setPinnedNodes] = useState([]);

    let clickTimeout = null;




    const getAllDescendantPaths = (node, parentIndex) => {
        let paths = [];
        const traverse = (node, path) => {
            if (node.children && node.children.length > 0) {
                node.children.forEach((child, index) => {
                    console.log(child)
                    const newPath = `${path}-${index}`;
                    paths.push(newPath);
                    traverse(child, newPath);
                });
            }
        };


        traverse(node, parentIndex);
        return paths;
    };


    const handleNodeClick = (path, node) => {
        if (!clickTimeout) {
            clickTimeout = setTimeout(() => {
                // Single Click Action
                setExpandedNodes(prevExpandedNodes =>
                    prevExpandedNodes.includes(path)
                        ? prevExpandedNodes.filter(item => item !== path)
                        : [...prevExpandedNodes, path]
                );
                clickTimeout = null;
            }, 200);
        } else {
            // Detected a Double Click
            clearTimeout(clickTimeout);
            clickTimeout = null;
            handleNodeDoubleClick(path, node);
        }
    };



    const handleNodeDoubleClick = (path, node) => {
        setExpandedNodes(prevExpandedNodes => {
            if (prevExpandedNodes.includes(path)) {
                // Collapse: Remove the node and its descendants
                return prevExpandedNodes.filter(item => !item.startsWith(path));
            } else {
                // Expand: Add the node and its descendants
                const descendantPaths = getAllDescendantPaths(node, path);
                return [...prevExpandedNodes, path, ...descendantPaths];
            }
        });
    };

    const renderNode = (node, parentIndex, index) => {
        const path = `${parentIndex}-${index}`;
        const isExpanded = expandedNodes.includes(path) || pinnedNodes.includes(path);
        const hasChildren = node.children && node.children.length > 0;

        return (
            <li key={path} className={`person ${isExpanded ? 'expanded' : ''} ${hasChildren ? 'has-children' : ''}`}>
            <div
            onClick={() => handleNodeClick(path, node)} 
            class='noselect'
            className={`innernode ${hasChildren ? 'has-children' : ''}`}
            style={{ userSelect: 'none' }}
            >
                {node.name} {node.lastname}
                {node.spouse && <span> & {node.spouse.name} {node.spouse.lastname}</span>}
            </div>
            {isExpanded && hasChildren && (
                <ul className='node'>
                {node.children.map((child, childIndex) => renderNode(child, path, childIndex))}
                </ul>
            )}
            </li>
        );
    };



    return (
        <div className="tree">
                <ul className='node'>
                {treeData.map((item, index) => 
                selectedFamilies.includes(item.lastname) ? renderNode(item, index, index) : null)}
                </ul>
        </div>
);
};



export default FamilyTree;
