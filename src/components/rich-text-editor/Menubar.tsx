import React from 'react'
import {type Editor} from '@tiptap/react'
import { Tooltip, TooltipContent, TooltipProvider } from '../ui/tooltip';
import { TooltipTrigger } from '@radix-ui/react-tooltip';
import { Toggle } from '../ui/toggle';
import { AlignCenter, AlignLeft, AlignRight, Bold, Heading1, Heading2, Heading3, Italic, List, ListOrdered, Redo2, Strikethrough, Undo2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

interface iAppProps {
    editor: Editor | null
}

export const Menubar = ({editor}: iAppProps) => {
    if (!editor){
        return null;
    }
  return (
    <div className='border border-input border-t-0 border-x-0 rounded-t-lg p-2 bg-card flex flex-wrap gap-1'>
        <TooltipProvider>
            <div className='flex flex-wrap gap-1'>
                {/* BOLD */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Toggle size="sm" pressed={editor.isActive('bold')} onPressedChange={() => editor.chain().focus().toggleBold().run()} className={cn(
                            editor.isActive("bold") && "bg-muted text-muted-forground"
                        )}>
                            <Bold/>
                        </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Bold</p>
                    </TooltipContent>
                </Tooltip>

                {/* ITALIC */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Toggle size="sm" pressed={editor.isActive('italic')} onPressedChange={() => editor.chain().focus().toggleItalic().run()} className={cn(
                            editor.isActive("italic") && "bg-muted text-muted-forground"
                        )}>
                            <Italic/>
                        </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Italic</p>
                    </TooltipContent>
                </Tooltip>

                {/* STRIKE */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Toggle size="sm" pressed={editor.isActive('strike')} onPressedChange={() => editor.chain().focus().toggleStrike().run()} className={cn(
                            editor.isActive("strike") && "bg-muted text-muted-forground"
                        )}>
                            <Strikethrough/>
                        </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Strike</p>
                    </TooltipContent>
                </Tooltip>

                {/* HEADING 1 */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Toggle size="sm" pressed={editor.isActive('heading', {level: 1})} onPressedChange={() => editor.chain().focus().toggleHeading({level: 1}).run()} className={cn(
                            editor.isActive("heading", {level: 1}) && "bg-muted text-muted-forground"
                        )}>
                            <Heading1/>
                        </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Heading 1</p>
                    </TooltipContent>
                </Tooltip>

                {/* HEADING 2 */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Toggle size="sm" pressed={editor.isActive('heading', {level: 2})} onPressedChange={() => editor.chain().focus().toggleHeading({level: 2}).run()} className={cn(
                            editor.isActive("heading", {level: 2}) && "bg-muted text-muted-forground"
                        )}>
                            <Heading2/>
                        </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Heading 2</p>
                    </TooltipContent>
                </Tooltip>

                {/* HEADING 3 */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Toggle size="sm" pressed={editor.isActive('heading', {level: 3})} onPressedChange={() => editor.chain().focus().toggleHeading({level: 3}).run()} className={cn(
                            editor.isActive("heading", {level: 3}) && "bg-muted text-muted-forground"
                        )}>
                            <Heading3/>
                        </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Heading 3</p>
                    </TooltipContent>
                </Tooltip>

                {/* BULLET LIST */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Toggle size="sm" pressed={editor.isActive('bulletList')} onPressedChange={() => editor.chain().focus().toggleBulletList().run()} className={cn(
                            editor.isActive("bulletList") && "bg-muted text-muted-forground"
                        )}>
                            <List/>
                        </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Bullet List</p>
                    </TooltipContent>
                </Tooltip>

                {/* ORDERED LIST */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Toggle size="sm" pressed={editor.isActive('orderedList')} onPressedChange={() => editor.chain().focus().toggleOrderedList().run()} className={cn(
                            editor.isActive("orderedList") && "bg-muted text-muted-forground"
                        )}>
                            <ListOrdered/>
                        </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Ordered List</p>
                    </TooltipContent>
                </Tooltip>

            </div>
            <div className="w-px h-6 bg-border max-2"/>
            <div className="flex flex-wrap gap-1">
                {/* ALIGN LEFT */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Toggle size="sm" pressed={editor.isActive({textAlign: "left"})} onPressedChange={() => editor.chain().focus().setTextAlign("left").run()} className={cn(
                            editor.isActive("textAlign", {align: "left"}) && "bg-muted text-muted-forground"
                        )}>
                            <AlignLeft/>
                        </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Align Left</p>
                    </TooltipContent>
                </Tooltip>

                {/* ALIGN CENTER */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Toggle size="sm" pressed={editor.isActive({textAlign: "center"})} onPressedChange={() => editor.chain().focus().setTextAlign("center").run()} className={cn(
                            editor.isActive("textAlign", {align: "center"}) && "bg-muted text-muted-forground"
                        )}>
                            <AlignCenter/>
                        </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Align Center</p>
                    </TooltipContent>
                </Tooltip>

                {/* ALIGN RIGHT */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Toggle size="sm" pressed={editor.isActive({textAlign: "right"})} onPressedChange={() => editor.chain().focus().setTextAlign("right").run()} className={cn(
                            editor.isActive("textAlign", {align: "right"}) && "bg-muted text-muted-forground"
                        )}>
                            <AlignRight/>
                        </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Align Right</p>
                    </TooltipContent>
                </Tooltip>

            </div>
            {/* DIVIDER */}
            <div className="w-px h-6 bg-border max-2"/>
            <div className="flex flex-wrap gap-1">
                {/* UNDO */}
                <Tooltip>
                    <TooltipTrigger asChild>
                       <Button type="button" size="sm" disabled={!editor.can().undo()}  onClick={() => editor.chain().focus().undo().run()} variant="ghost" className={cn(
                            editor.isActive("textAlign", {align: "left"}) && "bg-muted text-muted-forground"
                        )}>
                            <Undo2 className="h-4 w-4"/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Undo</p>
                    </TooltipContent>
                </Tooltip>

               {/* REDO */}
                <Tooltip>
                    <TooltipTrigger asChild>
                       <Button type="button" size="sm" disabled={!editor.can().redo()}  onClick={() => editor.chain().focus().redo  ().run()} variant="ghost" className={cn(
                            editor.isActive("textAlign", {align: "left"}) && "bg-muted text-muted-forground"
                        )}>
                            <Redo2 className="h-4 w-4"/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Redo</p>
                    </TooltipContent>
                </Tooltip>

            

            </div>
        </TooltipProvider>
    </div>
  )
}
