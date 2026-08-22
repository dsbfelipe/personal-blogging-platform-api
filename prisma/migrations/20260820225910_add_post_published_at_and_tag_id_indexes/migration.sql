-- CreateIndex
CREATE INDEX "Post_published_at_idx" ON "Post"("published_at");

-- CreateIndex
CREATE INDEX "TagsOnPosts_tagId_idx" ON "TagsOnPosts"("tagId");
