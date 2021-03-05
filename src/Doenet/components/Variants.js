import BaseComponent from './abstract/BaseComponent';

export default class Variants extends BaseComponent {
  static componentType = "variants";
  static rendererType = undefined;

  static stateVariableForPropertyValue = "variants";


  static returnSugarInstructions() {
    let sugarInstructions = super.returnSugarInstructions();

    let breakStringIntoVariantsByCommas = function ({ matchedChildren }) {
      let newChildren = matchedChildren[0].state.value.split(",").map(x => ({
        componentType: "variant",
        state: { value: x.trim() }
      }));
      return {
        success: true,
        newChildren: newChildren,
      }
    }

    sugarInstructions.push({
      childrenRegex: /s/,
      replacementFunction: breakStringIntoVariantsByCommas
    });

    return sugarInstructions;

  }


  static returnChildLogic(args) {
    let childLogic = super.returnChildLogic(args);

    childLogic.newLeaf({
      name: "atLeastZeroVariants",
      componentType: 'variant',
      comparison: 'atLeast',
      number: 0,
      setAsBase: true,
    });

    return childLogic;
  }


  static returnStateVariableDefinitions() {

    let stateVariableDefinitions = super.returnStateVariableDefinitions();

    stateVariableDefinitions.nVariants = {
      public: true,
      componentType: "number",
      returnDependencies: () => ({
        variantChildren: {
          dependencyType: "child",
          childLogicName: "atLeastZeroVariants",
        }
      }),
      definition: function ({ dependencyValues }) {
        return { newValues: { nVariants: dependencyValues.variantChildren.length } }
      }
    }

    stateVariableDefinitions.variants = {
      public: true,
      componentType: "variant",
      isArray: true,
      entryPrefixes: ["variant"],
      returnArraySizeDependencies: () => ({
        nVariants: {
          dependencyType: "stateVariable",
          variableName: "nVariants",
        },
      }),
      returnArraySize({ dependencyValues }) {
        return [dependencyValues.nVariants];
      },
      returnArrayDependenciesByKey({ arrayKeys }) {
        let dependenciesByKey = {};
        for (let arrayKey of arrayKeys) {
          dependenciesByKey[arrayKey] = {
            variantChild: {
              dependencyType: "child",
              childLogicName: "atLeastZeroVariants",
              variableNames: ["value"],
              childIndices: [arrayKey]
            }
          }
        }
        return { dependenciesByKey }
      },
      arrayDefinitionByKey: function ({ dependencyValuesByKey, arrayKeys }) {
        let variants = {};
        for (let arrayKey of arrayKeys) {
          if (dependencyValuesByKey[arrayKey].variantChild.length === 1) {
            variants[arrayKey] = dependencyValuesByKey[arrayKey].variantChild[0]
              .stateValues.value.toLowerCase()
          }
        }
        return { newValues: { variants } }
      }
    }

    return stateVariableDefinitions;
  }

}