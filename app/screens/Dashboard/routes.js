import Author from "./Author";
import TypeScreen from "./Type";
import Team from "./Team";
import FrequencyApi from "../../api/FrequencyApi";
import MagazineApi from "../../api/MagazineApi";
import PublisherApi from "../../api/PublisherApi";
import BookTypeApi from "../../api/BookTypeApi";
import CategoryApi from "../../api/CategoryApi";
import StatusApi from "../../api/StatusApi";

export const menuSet = [
  {
    endpoint: "/dashboard/user",
    icon: "user",
    name: "User",
    subs: [
      { endpoint: "/dashboard/user#add", icon: "plus", name: "Add" },
      { endpoint: "/dashboard/user", icon: "ordered-list", name: "List" }
    ]
  },
  {
    endpoint: "/dashboard/book",
    icon: "book",
    name: "Book",
    subs: [
      { endpoint: "/dashboard/book#add", icon: "plus", name: "Add" },
      { endpoint: "/dashboard/book", icon: "ordered-list", name: "List" }
    ]
  },
  {
    endpoint: "/dashboard/team",
    icon: "team",
    name: "Team",
    component: Team,
    description: "Manage team",
    subs: [
      { endpoint: "/dashboard/team#add", icon: "plus", name: "Add" },
      { endpoint: "/dashboard/team", icon: "ordered-list", name: "List" }
    ]
  },
  {
    endpoint: "/dashboard/category",
    icon: "tags",
    name: "Category",
    component: TypeScreen,
    description: "Manage all categories",
    api: CategoryApi,
    subs: [
      { endpoint: "/dashboard/category#add", icon: "plus", name: "Add" },
      { endpoint: "/dashboard/category", icon: "ordered-list", name: "List" }
    ]
  },
  {
    endpoint: "/dashboard/author",
    icon: "solution",
    name: "Author",
    component: Author,
    description: "Manage all authors",
    subs: [
      { endpoint: "/dashboard/author#add", icon: "plus", name: "Add" },
      { endpoint: "/dashboard/author", icon: "ordered-list", name: "List" }
    ]
  },
  {
    endpoint: "/dashboard/booktype",
    icon: "file-exclamation",
    name: "Book type",
    component: TypeScreen,
    description: "Manage book type",
    api: BookTypeApi,
    subs: [
      { endpoint: "/dashboard/booktype#add", icon: "plus", name: "Add" },
      { endpoint: "/dashboard/booktype", icon: "ordered-list", name: "List" }
    ]
  },
  {
    endpoint: "/dashboard/frequency",
    icon: "interaction",
    name: "Frequency",
    component: TypeScreen,
    description: "Manage frequency",
    api: FrequencyApi,
    subs: [
      { endpoint: "/dashboard/frequency#add", icon: "plus", name: "Add" },
      { endpoint: "/dashboard/frequency", icon: "ordered-list", name: "List" }
    ]
  },
  {
    endpoint: "/dashboard/magazine",
    icon: "reconciliation",
    name: "Magazine",
    component: TypeScreen,
    description: "Manage magazine",
    api: MagazineApi,
    subs: [
      { endpoint: "/dashboard/magazine#add", icon: "plus", name: "Add" },
      { endpoint: "/dashboard/magazine", icon: "ordered-list", name: "List" }
    ]
  },
  {
    endpoint: "/dashboard/publisher",
    icon: "bank",
    name: "Publisher",
    component: TypeScreen,
    description: "Manage publisher",
    api: PublisherApi,
    subs: [
      { endpoint: "/dashboard/publisher#add", icon: "plus", name: "Add" },
      { endpoint: "/dashboard/publisher", icon: "ordered-list", name: "List" }
    ]
  },
  {
    endpoint: "/dashboard/status",
    icon: "alert",
    name: "Status",
    component: TypeScreen,
    description: "Manage book status",
    api: StatusApi,
    subs: [
      { endpoint: "/dashboard/status#add", icon: "plus", name: "Add" },
      { endpoint: "/dashboard/status", icon: "ordered-list", name: "List" }
    ]
  }
];
