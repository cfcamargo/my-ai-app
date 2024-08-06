<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import { useChat } from '@ai-sdk/vue';
const { messages, input, handleSubmit, stop, isLoading } = useChat();

const md = new MarkdownIt()
const renderMarkdown = (content: string) => {
  return md.render(content)
}

</script>

<template>
  <div class="flex flex-col h-screen w-full">
      <header class="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <Avatar class="w-8 h-8">
            <AvatarImage src="/placeholder-user.jpg" alt="Chat Partner" />
            <AvatarFallback>CP</AvatarFallback>
          </Avatar>
          <h1 class="text-lg font-semibold">Chat App</h1>
        </div>
        <Avatar class="w-8 h-8">
          <AvatarImage src="/placeholder-user.jpg" alt="You" />
          <AvatarFallback>YO</AvatarFallback>
        </Avatar>
      </header>

      <div class="flex flex-col flex-1 w-full max-w-screen-xl mx-auto justify-start">
        <div class="flex-1">
          <div v-for="m in messages" :key="m.id" class="overflow-auto py-4">
            <div v-if="m.role !== 'user'" id="ia" class="flex items-start gap-4">
              <Avatar class="w-8 h-8">
                <AvatarImage src="/placeholder-user.jpg" alt="Chat Partner" />
                <AvatarFallback>CP</AvatarFallback>
              </Avatar>
              <div v-if="m.content" class="bg-muted rounded-lg p-3 max-w-[75%]">
                 <div v-html="renderMarkdown(m.content)" />
                <div class="text-xs text-muted-foreground mt-1">2:30 PM</div>
              </div>
            </div>

            <div v-else id="user" class="flex items-start gap-4 justify-end">
              <div class="bg-primary rounded-lg p-3 max-w-[75%] text-primary-foreground" v-if="m.content">
                <div v-html="renderMarkdown(m.content)" />
                <div class="text-xs text-primary-foreground/80 mt-1">2:31 PM</div>
              </div>
              <Avatar class="w-8 h-8">
                <AvatarImage src="/placeholder-user.jpg" alt="You" />
                <AvatarFallback>YO</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        <form @submit="handleSubmit" class="bg-background border-t px-6 py-4 flex items-center gap-3">
          <Textarea v-model="input" placeholder="Type your message..." class="flex-1 resize-none" />
          <Button @click="stop" variant="outline" v-if="isLoading">
            <span>Cancel</span>
          </Button>
          <Button variant="outline" v-else>
            <span>Send</span>
          </Button>
        </form>
      </div>
    </div>
</template>
