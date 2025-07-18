import { createPanelModel } from '../components/product-panel/ProductPanelModel.js'
import { createPanelViewModel } from '../components/product-panel/ProductPanelViewModel.js'
import { createPanelView } from '../components/product-panel/ProductPanelView.js'
import '../components/product-panel/ProductPanel.css'
import '../components/card/CardStyles.css'

export default function initializePanel(panelContainer, filterContainer) {
  const panelModel = createPanelModel([]);
  const panelView = createPanelView(panelContainer, filterContainer);
  const panelViewModel = createPanelViewModel(panelModel, panelView);

  panelViewModel.initializePanel();
}
