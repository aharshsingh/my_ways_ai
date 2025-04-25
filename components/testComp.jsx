// "use client"

// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import { ArrowUp, Pencil, Trash2 } from "lucide-react"
// import { useMemo, useState } from "react"

// function WithSort() {
//   const [search, setSearch] = useState("")
//   const [sort, setSort] = useState({ key: "name", order: "asc" })
  
  
//   const filteredTags = useMemo(() => {
//     return tags
//       .filter((tag) => {
//         const searchValue = search.toLowerCase()
//         return (
//           tag.name.toLowerCase().includes(searchValue) ||
//           tag.description.toLowerCase().includes(searchValue) ||
//           tag.relatedTags.some((relatedTag) =>
//             relatedTag.toLowerCase().includes(searchValue)
//           )
//         )
//       })
//       .sort((a, b) => {
//         if (sort.order === "asc") {
//           return a[sort.key] > b[sort.key] ? 1 : -1
//         } else {
//           return a[sort.key] < b[sort.key] ? 1 : -1
//         }
//       })
//   }, [search, sort])
  
//   return (
//     <div className="mx-auto my-6 w-full max-w-6xl rounded border">
//       <div className="flex flex-wrap items-center justify-between gap-4 border-b p-4 md:py-2">
//         <h1 className="text-xl font-bold">Tag Cloud</h1>
//         <div className="flex items-center gap-2">
//           <Input
//             value={search}
//             placeholder="Search tags..."
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" size="sm">
//                 <ArrowUp className="size-4 text-muted-foreground" />
//                 <span className="ml-2">Sort by</span>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-[200px]" align="end">
//               <DropdownMenuRadioGroup
//                 value={sort.key}
//                 onValueChange={(key) => setSort({ key, order: sort.order })}
//               >
//                 <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
//                 <DropdownMenuRadioItem value="bookmarks">Bookmarks</DropdownMenuRadioItem>
//                 <DropdownMenuRadioItem value="description">Description</DropdownMenuRadioItem>
//               </DropdownMenuRadioGroup>
//               <DropdownMenuSeparator />
//               <DropdownMenuRadioGroup
//                 value={sort.order}
//                 onValueChange={(order) => setSort({ key: sort.key, order })}
//               >
//                 <DropdownMenuRadioItem value="asc">Ascending</DropdownMenuRadioItem>
//                 <DropdownMenuRadioItem value="desc">Descending</DropdownMenuRadioItem>
//               </DropdownMenuRadioGroup>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Tag Name</TableHead>
//             <TableHead className="text-right">Bookmarks</TableHead>
//             <TableHead>Description</TableHead>
//             <TableHead>Related Tags</TableHead>
//             <TableHead className="text-right">Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {filteredTags.map((tag) => (
//             <TableRow key={tag.name}>
//               <TableCell>{tag.name}</TableCell>
//               <TableCell className="text-right">{tag.bookmarks.toLocaleString()}</TableCell>
//               <TableCell>{tag.description}</TableCell>
//               <TableCell>
//                 <div className="flex flex-wrap gap-2">
//                   {tag.relatedTags.map((relatedTag) => (
//                     <Badge variant="outline" key={relatedTag}>{relatedTag}</Badge>
//                   ))}
//                 </div>
//               </TableCell>
             
             
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   )
// }

// export { WithSort }


// <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline">Edit Profile</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Edit profile</DialogTitle>
//           <DialogDescription>
//             Make changes to your profile here. Click save when you're done.
//           </DialogDescription>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="name" className="text-right">
//               Name
//             </Label>
//             <Input
//               id="name"
//               defaultValue="Pedro Duarte"
//               className="col-span-3"
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="username" className="text-right">
//               Username
//             </Label>
//             <Input
//               id="username"
//               defaultValue="@peduarte"
//               className="col-span-3"
//             />
//           </div>
//         </div>
//         <DialogFooter>
//           <Button type="submit">Save changes</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>