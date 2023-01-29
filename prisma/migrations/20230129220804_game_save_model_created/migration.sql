-- CreateTable
CREATE TABLE "GameSave" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gameName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "directorySaveGame" TEXT NOT NULL,
    "provider" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "GameSave_id_key" ON "GameSave"("id");

-- CreateIndex
CREATE UNIQUE INDEX "GameSave_gameName_key" ON "GameSave"("gameName");
