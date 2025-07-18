import { createBannerModel } from '../components/banner/BannerModel.js'
import { createBannerView } from '../components/banner/BannerView.js'
import { createBannerViewModel } from '../components/banner/BannerViewModel.js'
import {
  PLACEHOLDER_IMG,
  PLACEHOLDER_IMG2,
  PLACEHOLDER_IMG3,
  PLACEHOLDER_IMG4,
} from '../components/banner/constants.js'
import '../components/banner/Banner.css'

export default function initializeBanner(bannerContainer) {
  const bannerItems = [
    {
      title: 'Hello User!',
      subtitle: 'What are we doing today?',
      link: '#',
      image: PLACEHOLDER_IMG,
    },
    {
      title: 'Special Offer',
      subtitle: 'Check out our deals!',
      link: 'https://example.com/deals',
      image: PLACEHOLDER_IMG2,
    },
    {
      title: 'New Collection',
      subtitle: 'Explore the latest trends',
      link: 'https://example.com/new',
      image: PLACEHOLDER_IMG3,
    },
    {
      title: 'Exclusive Discount',
      subtitle: 'Save up to 50% on selected items',
      link: 'https://example.com/discount',
      image: PLACEHOLDER_IMG4,
    },
  ]

  const bannerModel = createBannerModel(bannerItems)
  const bannerView = createBannerView(bannerContainer)
  const bannerViewModel = createBannerViewModel(bannerModel, bannerView)
  bannerViewModel.initializeBanner()
}
